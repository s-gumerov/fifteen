import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import {TBadRequest} from '../../api/types'
import {
  STORE_NAME,
  TAuthData,
  TAuthResponse,
  TUserInfo,
  BASE_URL_API,
  TUserPassword,
} from '../../api'
import {axiosInstanceDB} from '../../api/axios'
import {
  forumReducerTypes,
  TForum,
  TForumRequest,
  TForumResponse,
  TForumState,
  TForumTopic,
  TThread,
  TThreadRequest
} from './types'
import {isError} from '../../utils/isError'

export const getTopicsWithThreads = createAsyncThunk<TForum, TForumRequest>
(forumReducerTypes.getTopicsWithComments, async function (data, {dispatch}) {
  const responseTopics = await axiosInstanceDB('/api/get-topics', {
    method: 'get',
    data
  })
  for (const topic of responseTopics.data) {
    const {id} = topic
    console.log(id)
    // const responseThread = await getTopicThreads({topic: id, quantity: 100, start: 0})
      //console.log(await getTopicThreads({  "topic": 2, "quantity": 100, "start": 0}))
  }
  console.log(responseTopics.data)
  return responseTopics.data
})

export const getTopicThreads = async function (data: TThreadRequest) {
  console.log(data)
    const response = await axiosInstanceDB('/api/get-thread-by-topic', {
      method: 'get',
      data
    })
    return response.data
}

// export const getTopicThreads = createAsyncThunk<TThread, TThreadRequest>
// (forumReducerTypes.getTopicComments, async function (data,{dispatch}) {
//   const response = await axiosInstanceDB('/api/get-thread-by-topic', {
//     method: 'get',
//     data
//   })
//   //response.data.avatar = `${BASE_URL_API}/api/v2/resources${response.data.avatar}`
//
//   return response.data
// })

export const getThreadsAnswers = createAsyncThunk<TUserInfo | TBadRequest,
  undefined,
  { rejectValue: string }>(forumReducerTypes.getCommentsAnswers, async function () {
  const response = await axiosInstanceDB('/api/v2/auth/user', {
    method: 'get',
  })

  return response.data
})

export const createTopic = createAsyncThunk<TAuthResponse | TBadRequest,
  TAuthData,
  { rejectValue: string }>(forumReducerTypes.createTopic, async function (data, {dispatch}) {
  const response = await axiosInstanceDB('/api/v2/auth/signin', {
    method: 'post',
    data,
  })

  return response.data
})

export const createComment = createAsyncThunk<TAuthResponse | TBadRequest,
  TForumRequest,
  { rejectValue: string }>(forumReducerTypes.createComment, async function (data, {dispatch}) {
  const response = await axiosInstanceDB('/api/v2/auth/signin', {
    method: 'post',
    data,
  })
  const userInfo = await dispatch(getTopicsWithThreads(data))
  localStorage.setItem(STORE_NAME.USER, JSON.stringify(userInfo.payload))

  return response.data
})

export const createAnswer = createAsyncThunk<TAuthResponse | TBadRequest, TForumRequest, { rejectValue: string }>(forumReducerTypes.createAnswer, async function (data, {dispatch}) {
  const response = await axiosInstanceDB('/api/v2/auth/signin', {
    method: 'post',
    data,
  })
  const userInfo = await dispatch(getTopicsWithThreads(data))
  localStorage.setItem(STORE_NAME.USER, JSON.stringify(userInfo.payload))

  return response.data
})

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
        state.forum = action.payload as unknown as TForum
        state.error = null
        state.status = 'FETCH_FULFILLED'
      })
      // .addCase(logoutByThunk.fulfilled, state => {
      //   state.user = null
      //   state.error = null
      //   state.status = null
      // })
      // .addCase(changeProfileByThunk.fulfilled, (state, action) => {
      //   state.user = action.payload as TUserInfo
      //   state.error = null
      //   state.status = 'FETCH_FULFILLED'
      // })
      // .addCase(changeAvatarByThunk.fulfilled, (state, action) => {
      //   state.user = action.payload as TUserInfo
      //   state.error = null
      //   state.status = 'FETCH_FULFILLED'
      // })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.forum = null
        state.error = action.payload ?? 'Error!'
        state.status = 'FETCH_FAILED'
      })
  },
})

export default forumSlice.reducer
