import { TUserState } from './user/types'
import { TLeaderboardState } from './leaderboard/types'

export type TInitialState = {
  user: TUserState
  leaderboard: TLeaderboardState
}
