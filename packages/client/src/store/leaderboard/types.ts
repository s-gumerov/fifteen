import { TLeaderboard } from '../../api/leaderbord'

export enum LeaderboardReducerTypes {
  leaderboard = 'leaderboard',
  allLeaderboard = 'leaderboard/all',
}

export type TLeaderboardState = {
  leaderboard: TLeaderboard | null
  error: string | null
  status: 'INIT' | 'FETCHING' | 'FETCH_FULFILLED' | 'FETCH_FAILED' | null
}
