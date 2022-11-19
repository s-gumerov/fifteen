import { axiosInstance } from '../axios'
import { STORE_NAME, ENDPOINT } from '..'
import {
  TAddPlayerToLeaderboard,
  TAddPlayerToLeaderboardResponse,
  TGetLeaderboard,
  TGetLeaderboardResponse,
  TLeaderboard,
} from './types'

export const setLeaderboardToLocalStorage = async (
  leaderboard: TLeaderboard
) => {
  localStorage.setItem(STORE_NAME.LEADERBOARD, JSON.stringify(leaderboard))
}

export const addPlayerToLeaderboard = async (
  data: TAddPlayerToLeaderboard
): Promise<TAddPlayerToLeaderboardResponse> => {
  try {
    const result = await axiosInstance<TAddPlayerToLeaderboardResponse>(
      ENDPOINT.LEADERBOARD,
      {
        method: 'post',
        data,
      }
    )
    return result.data
  } catch (error) {
    console.log(error)
  }
}

export const getAllLeaderboard = async (
  data: TGetLeaderboard
): Promise<TGetLeaderboardResponse> => {
  try {
    const result = await axiosInstance<TGetLeaderboardResponse>(
      ENDPOINT.ALLLEADERBOARD,
      {
        method: 'post',
        data,
      }
    )

    const leaderboard = result.data as TLeaderboard
    await setLeaderboardToLocalStorage(leaderboard)
    return leaderboard
  } catch (error) {
    console.log(error)
  }
}
