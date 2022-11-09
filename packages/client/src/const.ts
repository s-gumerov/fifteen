import type {TGetLeaderboard, TRatingFieldName} from './api/leaderbord';

export const appTitle = 'Пятнашки';

export const leaderboardDefaultQuery:TGetLeaderboard = {
  "ratingFieldName": "moves",
  "teamName": "fifteen",
  "cursor": 0,
  "limit": 100
};

export const ratingFieldName:TRatingFieldName = 'time';

export const teamName = 'fifteen';
