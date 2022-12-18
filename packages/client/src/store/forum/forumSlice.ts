import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { axiosInstanceDB } from '../../api/axios'
import {
  forumReducerTypes,
  TAnswerRequest,
  TCreateThreadRequest,
  TCreateTopicRequest,
  TForum,
  TForumRequest,
  TForumState,
  TGetTopicByIdRequest,
  TThreadByIdRequest,
  TThreadRequest,
} from './types'
import { isError } from '../../utils/isError'

export const getTopicsWithThreads = createAsyncThunk<TForum, TForumRequest>(
  forumReducerTypes.getTopicsWithComments,
  async function (data) {
    const responseTopics = await getTopics(data)
    for (const topic of responseTopics) {
      const { id } = topic
      topic.comments = await getTopicThreads({ topic: id })
    }
    return responseTopics
  }
)

export const getTopics = async (data: TForumRequest = {}) => {
  const response = await axiosInstanceDB('/get-topics', {
    method: 'post',
    data,
  })
  return response.data
}

export const getTopicById = async (data: TGetTopicByIdRequest) => {
  const response = await axiosInstanceDB('/get-topic', {
    method: 'post',
    data,
  })
  return response.data
}

export const createTopic = async (data: TCreateTopicRequest) => {
  const response = await axiosInstanceDB('/create-topic', {
    method: 'post',
    data,
  })
  return response.data
}

export const getTopicThreads = async (data: TThreadRequest) => {
  const response = await axiosInstanceDB('/get-thread-by-topic', {
    method: 'post',
    data,
  })
  return response.data
}

export const getThreadById = async (data: TThreadByIdRequest) => {
  const response = await axiosInstanceDB('/get-thread', {
    method: 'post',
    data,
  })
  return response.data
}

export const getThreadAnswers = async (data: TAnswerRequest) => {
  const response = await axiosInstanceDB('/get-answers-by-thread', {
    method: 'post',
    data,
  })
  return response.data
}

export const createComment = async (data: TCreateThreadRequest) => {
  const response = await axiosInstanceDB('/create-thread', {
    method: 'post',
    data,
  })
  return response.data
}

const initialState: TForumState = {
  forum: null,
  error: null,
  status: null,
}

const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTopicsWithThreads.pending, state => {
        state.status = 'FETCHING'
        state.error = null
      })
      .addCase(getTopicsWithThreads.fulfilled, (state, action) => {
        state.forum = action.payload as TForum
        state.error = null
        state.status = 'FETCH_FULFILLED'
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.forum = null
        state.error = action.payload ?? 'Error!'
        state.status = 'FETCH_FAILED'
      })
  },
})

export default forumSlice.reducer
