import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import leaderboardReducer from './leaderboard/leaderboardSlice'
import forumSlice from "./forum/forumSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    leaderboard: leaderboardReducer,
    forum: forumSlice
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
