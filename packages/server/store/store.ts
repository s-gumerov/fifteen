import {axiosInstance, axiosInstanceDB} from './axios'
import {
  TGetLeaderboard,
  TLeaderboard,
  TState,
  TUser,
} from './types'
import {TTheme, TThemeState} from '../routes/models/theme';
import { TLeaderboardState } from './types'
import {ENDPOINT} from '../routes/models/theme';
import {getUserTheme} from '../routes/models/theme';

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
  theme: {
    theme: 'darkTheme',
    error: null,
    status: null,
  },
}

export const getStoreFromServer = (
  userData: TUser | null,
  themeData: TTheme,
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

  const theme: TThemeState = {
    theme: themeData,
    error: null,
    status: 'FETCH_FULFILLED',
  }

  return userData
    ? {
        user: {
          user: userData,
          error: null,
          status: 'FETCH_FULFILLED',
        },
        theme,
        leaderboard,
      }
    : {
        user: {
          user: null,
          error: 'Error!',
          status: 'FETCH_FAILED',
        },
        theme,
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

export const getUserThemeByThunk = async (
  data:getUserTheme.Request
): Promise<getUserTheme.Response['theme_name'] | null> => {
  try {
    console.log('test')
    const response:getUserTheme.Response = await axiosInstanceDB(ENDPOINT.GET_THEME, {
      method: 'get',
      data:data
    })
    console.log(ENDPOINT.GET_THEME)
    return response.theme_name
  } catch (error) {
    console.log(error)
    return null
  }
}
