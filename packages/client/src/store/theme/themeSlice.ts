import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import {TBadRequest} from '../../api/types'
import {ENDPOINT} from '../../api'
import {axiosInstanceDB} from '../../api/axios'
import {TThemeState, TTheme} from './types'
import {isError} from '../../utils/isError'
import {TInitialState} from "../types";
import {
  createUserTheme,
  getUserTheme,
  changeUserTheme
} from 'server/routes/models/theme';

export const initialStateOfTheme: TThemeState = {
  theme: 'darkTheme',
  error: null,
  status: null,
}



export const createUserThemeByThunk = createAsyncThunk<
  createUserTheme.Request,
  createUserTheme.Response,
  { rejectValue: string }
>(ENDPOINT.CREATE_THEME, async function (data) {
  const response:createUserTheme.Response = await axiosInstanceDB(ENDPOINT.CREATE_THEME, {
    method: 'post',
    data,
  })
  console.log(response)
  return response
})

export const getUserThemeByThunk = createAsyncThunk<
  TTheme,
  getUserTheme.Request
>(ENDPOINT.GET_THEME, async function (data) {

  const response:getUserTheme.Response = await axiosInstanceDB(ENDPOINT.GET_THEME, {
    method: 'get',
    data:data
  })
  return response.theme_name
})

export const changeUserThemeByThunk = createAsyncThunk<
  changeUserTheme.Request,
  changeUserTheme.Response,
  { rejectValue: string }
>(ENDPOINT.CHANGE_THEME, async function (data) {
  const response:changeUserTheme.Response = await axiosInstanceDB(ENDPOINT.CHANGE_THEME, {
    method: 'post',
    data,
  })

  return response
})

export const getThemeReducer = (state: TInitialState) => {
  const userSlice = createSlice({
    name: 'theme',
    initialState: state.theme,
    reducers: {},
    extraReducers: builder => {
      builder
        .addCase(createUserThemeByThunk.fulfilled, (state, action) => {
          state.theme =  action.payload.theme_name as TTheme
          state.error = null
          state.status = 'FETCH_FULFILLED'
        })
        // .addCase(getUserThemeByThunk.fulfilled, (state, action) => {
        //   state.theme =  action.payload.theme_name as TTheme
        //   state.error = null
        //   state.status = 'FETCH_FULFILLED'
        // })
        .addCase(changeUserThemeByThunk.fulfilled, (state, action) => {
          state.theme =  action.payload.theme_name as TTheme
          state.error = null
          state.status = 'FETCH_FULFILLED'
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
