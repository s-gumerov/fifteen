import { getLocationOrigin, isClient } from "../utils";

export const HOST = isClient() ? getLocationOrigin() : '';
export const BASE_URL_API = `${HOST}/praktikum-api`;
export const DB_URL_API = `${HOST}/api`;

export enum HTTP_STATUS_CODE {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  INTERNAL_SERVER_ERROR = 500,
}

export enum STORE_NAME {
  USER = 'fifteenUserStore',
  LEADERBOARD = 'fifteenLeaderboardStore',
}

export enum ENDPOINT {
  LEADERBOARD = '/api/v2/leaderboard',
  ALL_LEADERBOARD = '/api/v2/leaderboard/all',
  SERVICE_ID = '/api/v2/oauth/yandex/service-id',
  CREATE_THEME='/user/create-theme',
  GET_THEME='/user/get-theme',
  CHANGE_THEME='/user/change-theme',
}
