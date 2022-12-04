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
  theme: 'pink',
  error: null,
  status: null,
}
export const getThemesByThunk = createAsyncThunk<
  TTheme[] | TBadRequest,
  undefined,
  { rejectValue: string }
>(themeReducerTypes.getThemes, async function () {
  const response = await axiosInstance('/api/v2/auth/user', {
    method: 'get',
  })
  response.data.avatar = `${BASE_URL_API}/api/v2/resources${response.data.avatar}`
  return response.data
})

export const setUserThemeByThunk = createAsyncThunk<
  'ok' | TBadRequest,
  TAuthData,
  { rejectValue: string }
>(themeReducerTypes.setUserTheme, async function (data, {dispatch}) {
  const response = await axiosInstance('/api/v2/auth/signin', {
    method: 'post',
    data,
  })

  return response.data
})

export const getUserThemeByThunk = createAsyncThunk<
  TTheme | TBadRequest,
  TTheme,
  { rejectValue: string }
>(themeReducerTypes.getUserTheme, async function (data, {dispatch}) {
  const response = await axiosInstance('/api/v2/auth/signup', {
    method: 'post',
    data,
  })
  return response.data
})

export const getThemeReducer = (state: TInitialState) => {
  const userSlice = createSlice({
    name: 'theme',
    initialState: state.theme,
    reducers: {},
    extraReducers: builder => {
      builder
        .addCase(getThemesByThunk.pending, state => {
          state.status = 'FETCHING'
          state.error = null
        })
        .addCase(getUserThemeByThunk.fulfilled, (state, action) => {
          state.theme = action.payload as TTheme
          state.error = null
          state.status = 'FETCH_FULFILLED'
        })
        .addMatcher(isError, (state, action: PayloadAction<string>) => {
          state.theme = 'dark'
          state.error = action.payload ?? 'Error!'
          state.status = 'FETCH_FAILED'
        })
    },
  })

  return userSlice.reducer
}
