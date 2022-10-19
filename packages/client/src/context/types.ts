import React from 'react';
import {TLeaders} from "../pages/LeadersPage/types";

export type AuthContextProps = {
  isAuthorized: boolean,
  setAuthorization: React.Dispatch<React.SetStateAction<boolean>>,
} | null;

export type LeadersContextProps = {
  leaders: TLeaders,
  setLeaders: React.Dispatch<React.SetStateAction<TLeaders>>
} | null
