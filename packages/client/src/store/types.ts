import {TUserState} from "./user/types";
import {TLeaderboardState} from "./leaderboard/types";
import {TForumState} from "./forum/types";

export type TInitialState = {
  user: TUserState,
  leaderboard: TLeaderboardState
  forum: TForumState
}
