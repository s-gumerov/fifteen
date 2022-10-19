import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';
import {
  STORE_NAME,
  TAuthData,
  TAuthResponse,
  TBadRequest,
  TUserInfo
} from '../../api';
import { axiosInstance } from '../../api/axios';
import { TUserState, userReducerTypes } from './types';

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

export const getUserInfoByThunk = createAsyncThunk<TUserInfo | TBadRequest, undefined, { rejectValue: string }>(
  userReducerTypes.getUserInfo,
  async function() {
    const response = await axiosInstance('/api/v2/auth/user', {
      method: "get"
    })

    return response.data;
  }
);

export const authorizeByThunk = createAsyncThunk<TAuthResponse | TBadRequest, TAuthData, { rejectValue: string }>(
  userReducerTypes.authorize,
  async function (data, { dispatch }) {
    const response = await axiosInstance('/api/v2/auth/signin', {
      method: "post",
      data,
    });

    const userInfo = await dispatch(getUserInfoByThunk());
    localStorage.setItem(STORE_NAME, JSON.stringify(userInfo.payload));

    return response.data;
  }
);

export const logoutByThunk = createAsyncThunk<TAuthResponse, undefined, { rejectValue: string }>(
  userReducerTypes.logout,
  async function() {
    const response = await axiosInstance('/api/v2/auth/logout', {
      method: "post",
    });
    localStorage.removeItem(STORE_NAME);

    return response.data;
  }
);

const initialState: TUserState = {
  user: null,
  error: null,
  status: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfoByThunk.pending, (state) => {
        state.status = 'FETCHING';
        state.error = null;
      })
      .addCase(getUserInfoByThunk.fulfilled, (state, action) => {
        state.user = action.payload as TUserInfo;
        state.error = null;
        state.status = 'FETCH_FULFILLED';
      })
      .addCase(logoutByThunk.fulfilled, (state, action) => {
        state.user = null;
        state.error = null;
        state.status = null;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.user = null;
        state.error = action.payload ?? 'Error!';
        state.status = 'FETCH_FAILED';
      });
  }
});

export default userSlice.reducer;