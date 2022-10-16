import { TUserInfo } from '../../api';

export enum userReducerTypes {
  getUserInfo = 'user/getUserInfo',
  authorize = 'user/authorize',
  logout = 'user/logout'
}

export type TUserState = {
  user: TUserInfo | null,
  error: string | null,
  status: 'INIT' | 'FETCHING' | 'FETCH_FULFILLED' | 'FETCH_FAILED' | null,
}