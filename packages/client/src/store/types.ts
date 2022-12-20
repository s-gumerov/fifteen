import { TUserState } from './user/types'
import { TLeaderboardState } from './leaderboard/types'
import { TThemeState } from './theme/types'

export type TInitialState = {
  user: TUserState
  theme: TThemeState
  leaderboard: TLeaderboardState
}
