import {TTheme} from './routes/models/theme';

export const isClient = () => typeof window !== 'undefined'

export const getLocationOrigin = (): string => location.origin

export const HOST = isClient() ? getLocationOrigin() : '';
export const API_URL = '/api'
export const PRAKTIKUM_API_URL = 'https://ya-praktikum.tech'
export const DB_URL_API = `${HOST}/api`;
export const CLIENT_DIR = '../client/dist/client/'
export const DEFAULT_THEME:TTheme = 'darkTheme'

export enum HTTP_STATUS_CODE {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  INTERNAL_SERVER_ERROR = 500,
}
