import axios from 'axios'
import type { TGetLeaderboard, TLeaderboard, TState, TUser } from './types'
import { PRAKTIKUM_API_URL } from '../const'

export const initialState: TState = {
  user: {
    user: null,
    error: null,
    status: null,
  },
  leaderboard: {
    leaderboard: null,
    error: null,
    status: null,
  },
}

export const getStoreFromServer = (
  user: TUser | null,
  leaderboard: TLeaderboard | null
): TState =>
  user
    ? {
        user: {
          user,
          error: null,
          status: 'FETCH_FULFILLED',
        },
        leaderboard: {
          leaderboard,
          error: null,
          status: 'FETCH_FULFILLED',
        },
      }
    : {
        user: {
          user: null,
          error: 'Error!',
          status: 'FETCH_FAILED',
        },
        leaderboard: {
          leaderboard: null,
          error: 'Error!',
          status: 'FETCH_FAILED',
        },
      }

export const getUserInfo = async (cookie?: string): Promise<TUser | string> => {
  try {
    const result = await axios<TUser>(`${PRAKTIKUM_API_URL}/api/v2/auth/user`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookie,
      },
      withCredentials: true,
    })
    return result.data
  } catch (error) {
    return (error as Error).message
  }
}

const leaderboardDefaultQuery: TGetLeaderboard = {
  ratingFieldName: 'moves',
  teamName: 'fifteen',
  cursor: 0,
  limit: 100,
}

export const getLeaderboardByThunk = async (
  cookie?: string
): Promise<TLeaderboard | string> => {
  try {
    const result = await axios(`${PRAKTIKUM_API_URL}/api/v2/leaderboard/all`, {
      method: 'post',
      data: leaderboardDefaultQuery,
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookie,
      },
      withCredentials: true,
    })
    return result.data
  } catch (error) {
    return (error as Error).message
  }
}
