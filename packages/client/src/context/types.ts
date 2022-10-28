import React from 'react';
import {TPlayers} from "../pages/LeadersPage/types";

export type AuthContextProps = {
  isAuthorized: boolean,
  setAuthorization: React.Dispatch<React.SetStateAction<boolean>>,
} | null;

export type LeadersContextProps = {
  leaders: TPlayers,
  setLeaders: React.Dispatch<React.SetStateAction<TPlayers>>
} | null
