import { configureStore } from '@reduxjs/toolkit'
import { getUserReducer, initialStateOfUser } from './user/userSlice'
import {
  getLeaderboardReducer,
  initialStateOfLeaderboard,
} from './leaderboard/leaderboardSlice'
import { TInitialState } from './types'
import { isClient } from '../utils'
import forumSlice from './forum/forumSlice'

const initialState = {
  user: initialStateOfUser,
  leaderboard: initialStateOfLeaderboard,
}

declare global {
  interface Window {
    __PRELOADED_STATE__?: TInitialState
  }
}

const serverStore = isClient()
  ? (window.__PRELOADED_STATE__ as TInitialState)
  : initialState
isClient() && delete window.__PRELOADED_STATE__

const store = configureStore({
  reducer: {
    user: getUserReducer(serverStore),
    leaderboard: getLeaderboardReducer(serverStore),
    forum: forumSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
