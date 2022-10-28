import {createSlice, PayloadAction, createAsyncThunk, AnyAction} from '@reduxjs/toolkit';
import {
  USER_STORE_NAME,
  TAuthData,
  TAuthResponse,
  TChangeProfileResponse,
  TBadRequest,
  TUserInfo, TChangeAvatarResponse, TChangeAvatar, BASE_URL_API, TUserPassword
} from '../../api';
import {axiosInstance} from '../../api/axios';
import {TUserState, userReducerTypes} from './types';

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

export const getUserInfoByThunk = createAsyncThunk<TUserInfo | TBadRequest, undefined, { rejectValue: string }>(
  userReducerTypes.getUserInfo,
  async function () {
    const response = await axiosInstance('/api/v2/auth/user', {
      method: "get"
    })
    response.data.avatar = `${BASE_URL_API}/api/v2/resources${response.data.avatar}`
    return response.data;
  }
);

export const authorizeByThunk = createAsyncThunk<TAuthResponse | TBadRequest, TAuthData, { rejectValue: string }>(
  userReducerTypes.authorize,
  async function (data, {dispatch}) {
    const response = await axiosInstance('/api/v2/auth/signin', {
      method: "post",
      data,
    });
    const userInfo = await dispatch(getUserInfoByThunk());
    localStorage.setItem(USER_STORE_NAME, JSON.stringify(userInfo.payload));

    return response.data;
  }
);

export const logoutByThunk = createAsyncThunk<TAuthResponse, undefined, { rejectValue: string }>(
  userReducerTypes.logout,
  async function () {
    const response = await axiosInstance('/api/v2/auth/logout', {
      method: "post",
    });
    localStorage.removeItem(USER_STORE_NAME);

    return response.data;
  }
);

export const changeProfileByThunk = createAsyncThunk<TChangeProfileResponse | TBadRequest, TUserInfo, { rejectValue: string }>(
  userReducerTypes.changeProfile,
  async function (data, {dispatch}) {
    const response = await axiosInstance('/api/v2/user/profile', {
      method: "put",
      data,
    });
    response.data.avatar = `${BASE_URL_API}/api/v2/resources${response.data.avatar}`
    const userInfo = await dispatch(getUserInfoByThunk());
    localStorage.setItem(USER_STORE_NAME, JSON.stringify(userInfo.payload));

    return response.data;
  }
);

export const changeAvatarByThunk = createAsyncThunk<TChangeAvatarResponse | TBadRequest | TChangeAvatar, FormData>(
  userReducerTypes.changeAvatar,
  async function (data, {dispatch}) {
    const response = await axiosInstance('/api/v2/user/profile/avatar', {
      method: "put",
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data,
    })
    response.data.avatar = `${BASE_URL_API}/api/v2/resources${response.data.avatar}`
    const userInfo = await dispatch(getUserInfoByThunk());
    localStorage.setItem(USER_STORE_NAME, JSON.stringify(userInfo.payload));
    return response.data;
  }
)

export const changePassword = async function (data: TUserPassword) {
  await axiosInstance('/api/v2/user/password', {
    method: "put",
    data,
  });
}


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
        if (state.user.display_name === null) state.user.display_name = (action.payload as TUserInfo).login;
        state.error = null;
        state.status = 'FETCH_FULFILLED';
      })
      .addCase(logoutByThunk.fulfilled, (state) => {
        state.user = null;
        state.error = null;
        state.status = null;
      })
      .addCase(changeProfileByThunk.fulfilled, (state, action) => {
        state.user = action.payload as TUserInfo;
        state.error = null;
        state.status = 'FETCH_FULFILLED';
      })
      .addCase(changeAvatarByThunk.fulfilled, (state, action) => {
        state.user = action.payload as TUserInfo;
        state.error = null;
        state.status = 'FETCH_FULFILLED';
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.user = null;
        state.error = action.payload ?? 'Error!';
        state.status = 'FETCH_FAILED';
      })
  }
});

export default userSlice.reducer;
