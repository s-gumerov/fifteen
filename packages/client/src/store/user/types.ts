import { TUserInfo } from '../../api'

export enum userReducerTypes {
  getUserInfo = 'user/getUserInfo',
  authorize = 'user/authorize',
  OAuthorize = 'user/OAuthorize',
  logout = 'user/logout',
  changeProfile = 'user/changeProfile',
  changeAvatar = 'user/changeAvatar',
}

export type TUserState = {
  user: TUserInfo | null
  error: string | null
  status: 'INIT' | 'FETCHING' | 'FETCH_FULFILLED' | 'FETCH_FAILED' | null
}

export type TUserToDB = {
  id: number
  login: string
  avatarUrl: string
}
