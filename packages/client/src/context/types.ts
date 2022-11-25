import React from 'react'
import { TLeaderboard } from '../api/leaderbord'

export type AuthContextProps = {
  isAuthorized: boolean
  setAuthorization: React.Dispatch<React.SetStateAction<boolean>>
} | null

export type LeadersContextProps = {
  leaders: TLeaderboard | null
  setLeaders: React.Dispatch<React.SetStateAction<TLeaderboard | null>>
} | null
