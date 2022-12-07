import { axiosInstance, axiosInstanceDB } from "./axios";
import {TForumState, TLeaderboardState, TGetLeaderboard, TLeaderboard, TState, TUser, TForum, TForumRequest, TThreadRequest} from './types'

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
  forum: {
    forum: null,
    error: null,
    status: null,
  }
}

export const getStoreFromServer = (
  userData: TUser | null,
  leaderboardData?: TLeaderboard | null,
  forumData?: TForum | null
): TState => {
  const leaderboard: TLeaderboardState = leaderboardData ? {
    leaderboard: leaderboardData,
    error: null,
    status: 'FETCH_FULFILLED',
  } : {
    leaderboard: null,
    error: null,
    status: null,
  }
  const forum: TForumState = forumData ? {
    forum: forumData,
    error: null,
    status: 'FETCH_FULFILLED',
  } : {
    forum: null,
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
      forum,
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
      forum: {
        forum: null,
        error: 'Error!',
        status: 'FETCH_FAILED',
      }
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
      }
    })
    return result.data
  } catch (error) {
    return null
  }
}

export const getTopicsWithThreads = async (): Promise<TForum | null> => {
  const responseTopics = await getTopics({
    quantity: 3,
    start: 0
  })
  for (const topic of responseTopics) {
    const {id} = topic
    topic.comments = await getTopicThreads({topic: id})
  }
  return responseTopics
}

export const getTopics = async (data: TForumRequest = {}) => {
  const response = await axiosInstanceDB('/get-topics', {
    method: 'post',
    data
  })
  return response.data
}
export const getTopicThreads = async (data: TThreadRequest) => {
  const response = await axiosInstanceDB('/get-thread-by-topic', {
    method: 'post',
    data
  })
  return response.data
}
