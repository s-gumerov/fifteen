export const API_URL = '/api'
export const PRAKTIKUM_API_URL = 'https://ya-praktikum.tech'
export const IS_PROD_ENV = process.env.NODE_ENV === 'production' ? true : false
export const CLIENT_DIR = IS_PROD_ENV
  ? '../../client/dist/client/'
  : '../client/dist/client/'

export enum HTTP_STATUS_CODE {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  INTERNAL_SERVER_ERROR = 500,
}
