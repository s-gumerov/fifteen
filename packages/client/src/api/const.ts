export const BASE_URL_API = 'https://ya-praktikum.tech';

export enum HTTP_STATUS_CODE {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  INTERNAL_SERVER_ERROR = 500,
};

export enum StoreName {
  user = 'fifteenUserStore',
  leaderboard = "fifteenLeaderboardStore",
};

export enum Endpoints{
  leaderboard = '/api/v2/leaderboard',
  allLeaderboard  = '/api/v2/leaderboard/all',
};
