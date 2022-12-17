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

export type TState = {
  user: TUserState
  leaderboard?: TLeaderboardState
}

export type TGetLeaderboard = {
  ratingFieldName: 'id' | 'nickname' | 'moves' | 'time'
  cursor: number
  limit: number
  teamName: 'fifteen'
}
