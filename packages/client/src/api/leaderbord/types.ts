import { TPlayer } from '../../pages/LeadersPage/types'

export type TLeaderboard = {
  data: TPlayer
}[]

export type TRatingFieldName = 'id' | 'nickname' | 'moves' | 'time'

export type TTeamName = 'fifteen'

export type TAddPlayerToLeaderboard = {
  data: TPlayer
  ratingFieldName: TRatingFieldName
  teamName: TTeamName
}

export type TAddPlayerToLeaderboardResponse = 'OK' | undefined

export type TGetLeaderboard = {
  ratingFieldName: TRatingFieldName
  cursor: number
  limit: number
  teamName: TTeamName
}

export type TGetLeaderboardResponse = TLeaderboard | undefined
