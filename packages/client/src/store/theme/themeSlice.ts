import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import {TBadRequest} from '../../api/types'
import {
  TAuthData,
  TUserInfo,
  BASE_URL_API,
} from '../../api'
import {axiosInstance} from '../../api/axios'
import {TTheme, TThemeState, themeReducerTypes} from './types'
import {isError} from '../../utils/isError'
import {TInitialState} from "../types";

export const initialStateOfTheme: TThemeState = {
  theme: 'darkTheme',
  error: null,
  status: null,
}

enum PATH  {
  GET_THEME ='/get-theme'
}

export const setUserThemeByThunk = createAsyncThunk<
  TTheme | TBadRequest,
  TTheme,
  { rejectValue: string }
>(themeReducerTypes.setUserTheme, async function (data) {
  const response = await axiosInstance('/api/v2/auth/signin', {
    method: 'post',
    data,
  })

  return response.data
})

export const getUserThemeByThunk = createAsyncThunk<
  TTheme | TBadRequest,
  undefined,
    { rejectValue: string }
>(themeReducerTypes.getUserTheme, async function () {

  const response = await axiosInstance(PATH.GET_THEME, {
    method: 'get',
  })
  console.log()
  return response.data
})

export const getThemeReducer = (state: TInitialState) => {
  const userSlice = createSlice({
    name: 'theme',
    initialState: state.theme,
    reducers: {},
    extraReducers: builder => {
      builder
        .addCase(getUserThemeByThunk.fulfilled, (state, action) => {
          state.theme = action.payload as TTheme
          state.error = null
          state.status = 'FETCH_FULFILLED'
        })
        .addCase(setUserThemeByThunk.fulfilled, (state, action) => {
          // if(action.payload ==='ok'){
          //   getUserThemeByThunk()
          // }
        })
        .addMatcher(isError, (state, action: PayloadAction<string>) => {
          state.theme = 'darkTheme'
          state.error = action.payload ?? 'Error!'
          state.status = 'FETCH_FAILED'
        })
    },
  })

  return userSlice.reducer
}
