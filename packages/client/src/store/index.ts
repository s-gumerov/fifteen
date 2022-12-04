import { configureStore } from '@reduxjs/toolkit'
import { getUserReducer, initialStateOfUser } from './user/userSlice'
import { getLeaderboardReducer, initialStateOfLeaderboard} from './leaderboard/leaderboardSlice'
import { TInitialState } from "./types";
import { isClient } from "../utils";
import {getThemeReducer, initialStateOfTheme} from './theme/themeSlice';

const initialState = {
  user: initialStateOfUser,
  theme: initialStateOfTheme,
  leaderboard: initialStateOfLeaderboard,
}

declare global {
  interface Window {
    __PRELOADED_STATE__?: TInitialState
  }
}

const serverStore = isClient() && window.__PRELOADED_STATE__ ? window.__PRELOADED_STATE__ : initialState
isClient() && delete window.__PRELOADED_STATE__

const store = configureStore({
  reducer: {
    user: getUserReducer(serverStore),
    theme: getThemeReducer(serverStore),
    leaderboard: getLeaderboardReducer(serverStore),
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export default store
