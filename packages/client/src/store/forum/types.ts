

export enum forumReducerTypes {
  getTopicsWithComments = 'forum/getTopicsWithComments',
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

export type TForum = {
  authorId: number
  login: string
  avatarUrl: string
  text: string
  createdAt: string
  comments: TThread[]
}

export type TForumRequest = {
  quantity: number //Количество топиков
  start: number //Номер первого топика (отсортированы по created_at)
}

export type TForumResponse = {
  topics: TForumTopic[]
}

export type TForumTopic = {
  id: number
  authorId: number
  login: string
  avatarUrl: string
  text: string
  createdAt: string
}

export type TThread = {
  authorId: number
  login: string,
  avatarUrl: string,
  text: string
  createdAt: string
  answers: TAnswer[]
}

export type TThreadRequest = {
  topic: number //Тема для которой нужны комментарии
  quantity: number //Количество комментариев
  start: number //Номер первого комментария (отсортированы по created_at)
}

export type TThreadResponse = {
  threads: {
    authorId: number
    login: string,
    avatarUrl: string,
    text: string
    createdAt: string
  }[]
}

export type TAnswer = {
  authorId: number
  login: string
  avatarUrl: string
  text: string
  createdAt: string
}
