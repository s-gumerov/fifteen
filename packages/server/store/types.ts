export type TUser = {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  avatar: string
  email: string
  phone: string
}

type TPlayer = {
  id: number | undefined
  nickname: string
  moves: number
  time: string
  position?: number
}

export type TLeaderboard = {
  data: TPlayer
}[]

export type TLeaderboardState = {
  leaderboard: TLeaderboard | null
  error: string | null
  status: 'INIT' | 'FETCHING' | 'FETCH_FULFILLED' | 'FETCH_FAILED' | null
}

export type TUserState = {
  user: TUser | null
  error: string | null
  status: 'INIT' | 'FETCHING' | 'FETCH_FULFILLED' | 'FETCH_FAILED' | null
}

export type TForumState = {
  forum: TForum | null
  error: string | null
  status: 'INIT' | 'FETCHING' | 'FETCH_FULFILLED' | 'FETCH_FAILED' | null
}

export type TState = {
  user: TUserState;
  leaderboard?: TLeaderboardState;
  forum?: TForumState
}

export type TGetLeaderboard = {
  ratingFieldName: 'id' | 'nickname' | 'moves' | 'time'
  cursor: number
  limit: number
  teamName: 'fifteen'
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
export type TThread = {
  id: number
  authorId: number
  login: string,
  avatarUrl: string,
  text: string
  createdAt: string
}

export type TForumRequest = {
  quantity?: number //Количество топиков
  start?: number //Номер первого топика (отсортированы по created_at)
}
export type TThreadRequest = {
  topic: number //Тема для которой нужны комментарии
  quantity?: number //Количество комментариев
  start?: number //Номер первого комментария (отсортированы по created_at)
}
