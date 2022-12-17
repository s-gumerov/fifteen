export enum forumReducerTypes {
  getTopicsWithComments = 'forum/getTopicsWithComments',
  getTopicById = 'forum/getTopicById',
  getTopicComments = 'forum/getTopicComments',
  getCommentsAnswers = 'forum/getCommentsAnswers',
  createTopic = 'forum/createTopic',
  createComment = 'forum/createComment',
  createAnswer = 'forum/createAnswer',
}

export type TForumState = {
  forum: TForum | null
  error: string | null
  status: 'INIT' | 'FETCHING' | 'FETCH_FULFILLED' | 'FETCH_FAILED' | null
}

export type TForum = TTopic[]

export type TTopic = {
  id: number
  authorId: number
  login: string
  avatarUrl: string
  text: string
  createdAt: string
  comments?: TThread[]
}

export type TForumRequest = {
  quantity?: number //Количество топиков
  start?: number //Номер первого топика (отсортированы по created_at)
}

export type TForumResponse = {
  topics: TForum[]
}

export type TThread = {
  id: number
  authorId: number
  login: string
  avatarUrl: string
  text: string
  createdAt: string
  answers?: TAnswer[]
}

export type TThreadRequest = {
  topic: number //Тема для которой нужны комментарии
  quantity?: number //Количество комментариев
  start?: number //Номер первого комментария (отсортированы по created_at)
}

export type TThreadResponse = {
  threads: {
    authorId: number
    login: string
    avatarUrl: string
    text: string
    createdAt: string
  }[]
}

export type TThreadByIdRequest = {
  id: number
  topicId: number
}

export type TAnswer = {
  id: number
  authorId: number
  login: string
  avatarUrl: string
  text: string
  createdAt: string
}

export type TAnswerRequest = {
  thread: number
  quantity: number
  start: number
}

export type TCreateTopicRequest = {
  authorId: number
  login: string
  avatarUrl: string
  text: string
}
export type TCreateTopicResponse = { id: number }

export type TGetTopicByIdRequest = { id: number }
export type TGetTopicByIdResponse = {
  authorId: number
  login: string
  avatarUrl: string
  text: string
  createdAt: string
}

export type TCreateThreadRequest = {
  authorId: number
  login: string
  avatarUrl: string
  topicId: number
  text: string
}
