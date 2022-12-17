import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { TBadRequest } from '../../api/types'
import { ENDPOINT } from '../../api'
import { STORE_NAME } from '../../api'
import { axiosInstance } from '../../api/axios'
import { TLeaderboardState, LeaderboardReducerTypes } from './types'
import {
  TAddPlayerToLeaderboard,
  TAddPlayerToLeaderboardResponse,
  TGetLeaderboard,
  TGetLeaderboardResponse,
  TLeaderboard,
} from '../../api/leaderbord'
import { leaderboardDefaultQuery } from '../../const'
import { isError } from '../../utils/isError'
import { TInitialState } from '../types'

export const getLeaderboardByThunk = createAsyncThunk<
  TGetLeaderboardResponse | TBadRequest,
  TGetLeaderboard,
  { rejectValue: string }
>(LeaderboardReducerTypes.allLeaderboard, async function (data, { dispatch }) {
  const response = await axiosInstance(ENDPOINT.ALL_LEADERBOARD, {
    method: 'post',
    data,
  })

  localStorage.setItem(
    STORE_NAME.LEADERBOARD,
    JSON.stringify(response.data.payload)
  )

  return response.data
})

export const addPlayerToLeaderboardByThunk = createAsyncThunk<
  TAddPlayerToLeaderboardResponse | TBadRequest,
  TAddPlayerToLeaderboard,
  { rejectValue: string }
>(LeaderboardReducerTypes.leaderboard, async function (data, { dispatch }) {
  const response = await axiosInstance(ENDPOINT.LEADERBOARD, {
    method: 'post',
    data,
  })
  await dispatch(getLeaderboardByThunk(leaderboardDefaultQuery))
  return response.data
})

export const initialStateOfLeaderboard: TLeaderboardState = {
  leaderboard: null,
  error: null,
  status: null,
}

export const getLeaderboardReducer = (state: TInitialState) => {
  const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState: state.leaderboard,
    reducers: {},
    extraReducers: builder => {
      builder
        .addCase(getLeaderboardByThunk.pending, state => {
          state.status = 'FETCHING'
          state.error = null
        })
        .addCase(getLeaderboardByThunk.fulfilled, (state, action) => {
          state.leaderboard = action.payload as TLeaderboard
          state.error = null
          state.status = 'FETCH_FULFILLED'
        })
        .addCase(addPlayerToLeaderboardByThunk.fulfilled, state => {
          state.leaderboard = null
          state.error = null
          state.status = null
        })
        .addMatcher(isError, (state, action: PayloadAction<string>) => {
          state.leaderboard = null
          state.error = action.payload ?? 'Error!'
          state.status = 'FETCH_FAILED'
        })
    },
  })

  return leaderboardSlice.reducer
}
