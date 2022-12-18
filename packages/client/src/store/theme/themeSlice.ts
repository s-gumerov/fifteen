import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { ENDPOINT } from '../../api'
import { axiosInstanceDB } from '../../api/axios'
import { TThemeState } from './types'
import { isError } from '../../utils/isError'
import { TInitialState } from '../types'
import { getUserTheme, changeUserTheme } from 'server/routes/models/theme'
import { DEFAULT_THEME } from 'server/const'

export const initialStateOfTheme = {
  theme: DEFAULT_THEME,
  error: null,
  status: null,
}

export const getUserThemeByThunk = createAsyncThunk<
  changeUserTheme.Request,
  getUserTheme.Request
>(ENDPOINT.GET_THEME, async function (data) {
  const response = await axiosInstanceDB(ENDPOINT.GET_THEME, {
    method: 'post',
    data,
  })

  return response.data
})

export const changeUserThemeByThunk = createAsyncThunk<
  changeUserTheme.Request,
  changeUserTheme.Response,
  { rejectValue: string }
>(ENDPOINT.CHANGE_THEME, async function (data) {
  const response = await axiosInstanceDB(ENDPOINT.CHANGE_THEME, {
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
        .addCase(getUserThemeByThunk.fulfilled, (state, action) => {
          state.theme = action.payload.theme_name
          state.error = null
          state.status = 'FETCH_FULFILLED'
        })
        .addCase(changeUserThemeByThunk.fulfilled, (state, action) => {
          state.theme = action.payload.theme_name
          state.error = null
          state.status = 'FETCH_FULFILLED'
        })
        .addMatcher(isError, (state, action: PayloadAction<string>) => {
          state.theme = DEFAULT_THEME
          state.error = action.payload ?? 'Error!'
          state.status = 'FETCH_FAILED'
        })
    },
  })

  return userSlice.reducer
}
