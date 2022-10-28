import {TPlayer} from '../../pages/LeadersPage/types';

export type TLeaderboard = {
  data: TPlayer
}[];

export type TAddEntryToLeaderboard = {
  ratingFieldName: "moves",
  teamName: "fifteen"
} & TLeaderboard;

export type TAddEntryToLeaderboardResponse = "OK" | { reason: string } | undefined;

export type TGetAllLeaderboard = {
  ratingFieldName: "moves",
  cursor: number,
  limit: number
};

export type TGetAllLeaderboardResponse = TLeaderboard | { reason: string } | undefined;



