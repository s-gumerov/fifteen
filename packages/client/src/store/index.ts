import { configureStore } from '@reduxjs/toolkit'
import { getUserReducer, initialStateOfUser } from './user/userSlice'
import { getLeaderboardReducer, initialStateOfLeaderboard} from './leaderboard/leaderboardSlice'
import { TInitialState } from "./types";

const initialState = {
  user: initialStateOfUser,
  leaderboard: initialStateOfLeaderboard,
}

const serverStore = typeof window !== 'undefined' ? window.__PRELOADED_STATE__ : initialState
typeof window !== 'undefined' && delete window.__PRELOADED_STATE__

const store = configureStore({
  reducer: {
    user: getUserReducer(serverStore as TInitialState),
    leaderboard: getLeaderboardReducer(serverStore as TInitialState),
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export default store
