import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { TBadRequest } from '../../api/types'
import {
  STORE_NAME,
  TAuthData,
  TAuthResponse,
  TUserInfo,
  TChangeAvatarResponse,
  BASE_URL_API,
  TUserPassword,
} from '../../api'
import { axiosInstance, axiosInstanceDB } from '../../api/axios'
import { TUserState, TUserToDB, userReducerTypes } from './types'
import { isError } from '../../utils/isError'
import { TInitialState } from '../types'

export const getUserInfoByThunk = createAsyncThunk<
  TUserInfo | TBadRequest,
  undefined,
  { rejectValue: string }
>(userReducerTypes.getUserInfo, async function () {
  const response = await axiosInstance('/api/v2/auth/user', {
    method: 'get',
  })
  response.data.avatar = `${BASE_URL_API}/api/v2/resources${response.data.avatar}`
  return response.data
})

export const authorizeByThunk = createAsyncThunk<
  TAuthResponse | TBadRequest,
  TAuthData,
  { rejectValue: string }
>(userReducerTypes.authorize, async function (data, { dispatch }) {
  const response = await axiosInstance('/api/v2/auth/signin', {
    method: 'post',
    data,
  })
  const userInfo = await dispatch(getUserInfoByThunk())
  localStorage.setItem(STORE_NAME.USER, JSON.stringify(userInfo.payload))

  return response.data
})

export const signUpByThunk = createAsyncThunk<
  TUserInfo | TBadRequest,
  TUserInfo,
  { rejectValue: string }
>(userReducerTypes.authorize, async function (data, { dispatch }) {
  const response = await axiosInstance('/api/v2/auth/signup', {
    method: 'post',
    data,
  })
  const userInfo = await dispatch(getUserInfoByThunk())
  localStorage.setItem(STORE_NAME.USER, JSON.stringify(userInfo.payload))

  return response.data
})

export const logoutByThunk = createAsyncThunk<
  TAuthResponse,
  undefined,
  { rejectValue: string }
>(userReducerTypes.logout, async function () {
  const response = await axiosInstance('/api/v2/auth/logout', {
    method: 'post',
  })
  localStorage.removeItem(STORE_NAME.USER)

  return response.data
})

export const changeProfileByThunk = createAsyncThunk<
  TUserInfo | TBadRequest,
  TUserInfo,
  { rejectValue: string }
>(userReducerTypes.changeProfile, async function (data, { dispatch }) {
  const response = await axiosInstance('/api/v2/user/profile', {
    method: 'put',
    data,
  })
  response.data.avatar = `${BASE_URL_API}/api/v2/resources${response.data.avatar}`
  const userInfo = await dispatch(getUserInfoByThunk())
  localStorage.setItem(STORE_NAME.USER, JSON.stringify(userInfo.payload))

  return response.data
})

export const changeAvatarByThunk = createAsyncThunk<
  TChangeAvatarResponse | TBadRequest | TUserInfo,
  FormData
>(userReducerTypes.changeAvatar, async function (data, { dispatch }) {
  const response = await axiosInstance('/api/v2/user/profile/avatar', {
    method: 'put',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  })
  response.data.avatar = `${BASE_URL_API}/api/v2/resources${response.data.avatar}`
  const userInfo = await dispatch(getUserInfoByThunk())
  localStorage.setItem(STORE_NAME.USER, JSON.stringify(userInfo.payload))
  return response.data
})

export const addUserToDB = async (data: TUserToDB) => {
  await axiosInstanceDB('/set-new-user', {
    method: 'post',
    data,
  })
}

export const changePassword = async function (data: TUserPassword) {
  await axiosInstance('/api/v2/user/password', {
    method: 'put',
    data,
  })
}

export const initialStateOfUser: TUserState = {
  user: null,
  error: null,
  status: null,
}

export const getUserReducer = (state: TInitialState) => {
  const userSlice = createSlice({
    name: 'user',
    initialState: state.user,
    reducers: {},
    extraReducers: builder => {
      builder
        .addCase(getUserInfoByThunk.pending, state => {
          state.status = 'FETCHING'
          state.error = null
        })
        .addCase(getUserInfoByThunk.fulfilled, (state, action) => {
          state.user = action.payload as TUserInfo
          if (state.user.display_name === null)
            state.user.display_name = (action.payload as TUserInfo).login
          state.error = null
          state.status = 'FETCH_FULFILLED'
        })
        .addCase(logoutByThunk.fulfilled, state => {
          state.user = null
          state.error = null
          state.status = null
        })
        .addCase(changeProfileByThunk.fulfilled, (state, action) => {
          state.user = action.payload as TUserInfo
          state.error = null
          state.status = 'FETCH_FULFILLED'
        })
        .addCase(changeAvatarByThunk.fulfilled, (state, action) => {
          state.user = action.payload as TUserInfo
          state.error = null
          state.status = 'FETCH_FULFILLED'
        })
        .addMatcher(isError, (state, action: PayloadAction<string>) => {
          state.user = null
          state.error = action.payload ?? 'Error!'
          state.status = 'FETCH_FAILED'
        })
    },
  })

  return userSlice.reducer
}
