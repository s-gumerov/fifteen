import { axiosInstance } from './axios'
import { TGetLeaderboard, TLeaderboard, TState, TUser } from './types'
import { TLeaderboardState } from './types'

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
  userData: TUser | null,
  leaderboardData?: TLeaderboard | null
): TState => {
  const leaderboard: TLeaderboardState = leaderboardData
    ? {
        leaderboard: leaderboardData,
        error: null,
        status: 'FETCH_FULFILLED',
      }
    : {
        leaderboard: null,
        error: null,
        status: null,
      }

  return userData
    ? {
        user: {
          user: userData,
          error: null,
          status: 'FETCH_FULFILLED',
        },
        leaderboard,
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
}

export const getUserInfo = async (cookie?: string): Promise<TUser | null> => {
  try {
    const result = await axiosInstance<TUser>('/api/v2/auth/user', {
      method: 'get',
      headers: {
        Cookie: cookie,
      },
    })
    return result.data
  } catch (error) {
    return null
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
): Promise<TLeaderboard | null> => {
  try {
    const result = await axiosInstance('/api/v2/leaderboard/all', {
      method: 'post',
      data: leaderboardDefaultQuery,
      headers: {
        Cookie: cookie,
      },
    })
    return result.data
  } catch (error) {
    return null
  }
}
