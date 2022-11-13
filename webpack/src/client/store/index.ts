import {configureStore} from '@reduxjs/toolkit';
import {ThunkMiddlewareFor} from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import {AnyAction, EnhancedStore} from '@reduxjs/toolkit';
import userReducer from "./user/userSlice";
import leaderboardReducer from './leaderboard/leaderboardSlice';


export type TStore = EnhancedStore<any, AnyAction, [ThunkMiddlewareFor<any>]>

declare global {
  interface Window {
    __PRELOADED_STATE__: TStore | undefined;
  }
}
const state = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const store:TStore =  configureStore({
  reducer: {
    user: userReducer,
    leaderboard: leaderboardReducer
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;