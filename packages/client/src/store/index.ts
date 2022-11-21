import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import leaderboardReducer from './leaderboard/leaderboardSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    leaderboard: leaderboardReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
