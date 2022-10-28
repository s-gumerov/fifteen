import {axiosInstance} from '../axios';
import {LEADERBORD_STORE_NAME} from '..';
import {
  TAddEntryToLeaderboard,
  TAddEntryToLeaderboardResponse,
  TGetAllLeaderboard,
  TGetAllLeaderboardResponse, TLeaderboard
} from './types';

export const setLeaderboardToLocalStorage = async (leaderboard: TLeaderboard) => {
  localStorage.setItem(LEADERBORD_STORE_NAME, JSON.stringify(leaderboard));
}

export const addEntryToLeaderboard = async (data: TAddEntryToLeaderboard): Promise<TAddEntryToLeaderboardResponse> => {
  try {
    const result = await axiosInstance<TAddEntryToLeaderboardResponse>('/api/v2/leaderboard', {
      method: "post",
      data,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllLeaderboard = async (data: TGetAllLeaderboard): Promise<TGetAllLeaderboardResponse> => {
  try {
    const result = await axiosInstance<TGetAllLeaderboardResponse>('/api/v2/leaderboard/all', {
      method: "post",
      data,
    });

    if (result.data === undefined) {
      return;
    };

    const leaderboard = result.data as TLeaderboard;
    await setLeaderboardToLocalStorage(leaderboard);
  } catch (error) {
    console.log(error)
  }
};

