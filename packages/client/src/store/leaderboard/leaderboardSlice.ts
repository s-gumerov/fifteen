import {
  createSlice,
  PayloadAction,
  createAsyncThunk
} from '@reduxjs/toolkit';
import {TBadRequest} from '../../api/types';
import {Endpoints} from '../../api';
import {StoreName} from '../../api';
import {axiosInstance} from '../../api/axios';
import {TLeaderboardState, LeaderboardReducerTypes} from './types';
import {
  TAddPlayerToLeaderboard,
  TAddPlayerToLeaderboardResponse,
  TGetLeaderboard,
  TGetLeaderboardResponse,
  TLeaderboard
} from '../../api/leaderbord';
import {leaderboardDefaultQuery} from '../../const';
import {isError} from '../../utils/isError';


export const getLeaderboardByThunk = createAsyncThunk<TGetLeaderboardResponse | TBadRequest, TGetLeaderboard, { rejectValue: string }>(
  LeaderboardReducerTypes.allLeaderboard,
  async function (data, {dispatch}) {
    const response = await axiosInstance(Endpoints.allLeaderboard, {
      method: "post",
      data,
    });

    localStorage.setItem(StoreName.leaderboard, JSON.stringify(response.data.payload));

    return response.data;
  }
);

export const addPlayerToLeaderboardByThunk = createAsyncThunk<TAddPlayerToLeaderboardResponse | TBadRequest, TAddPlayerToLeaderboard, { rejectValue: string }>(
  LeaderboardReducerTypes.leaderboard,
  async function (data, {dispatch}) {
    const response = await axiosInstance(Endpoints.leaderboard, {
      method: "post",
      data,
    })
    await dispatch(getLeaderboardByThunk(leaderboardDefaultQuery));
    return response.data;
  }
)

const initialState: TLeaderboardState = {
  leaderboard: null,
  error: null,
  status: null,
}

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeaderboardByThunk.pending, (state) => {
        state.status = 'FETCHING';
        state.error = null;
      })
      .addCase(getLeaderboardByThunk.fulfilled, (state, action) => {
        state.leaderboard = action.payload as TLeaderboard;
        state.error = null;
        state.status = 'FETCH_FULFILLED';
      })
      .addCase(addPlayerToLeaderboardByThunk.fulfilled, (state) => {
        state.leaderboard = null;
        state.error = null;
        state.status = null;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.leaderboard = null;
        state.error = action.payload ?? 'Error!';
        state.status = 'FETCH_FAILED';
      })
  }
});

export default leaderboardSlice.reducer;
