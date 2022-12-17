import { TLeaderboard } from '../api/leaderbord'
import { TThread } from '../store/forum/types'

const secondsCountInMinute = 60
const secondsCountInHour = 3600

const getSeconds = (secondsCount: number): number =>
  Math.floor(secondsCount % secondsCountInMinute)
const getMinutes = (secondsCount: number): number =>
  Math.floor(secondsCount / secondsCountInMinute)
const getHours = (secondsCount: number): number =>
  Math.floor(secondsCount / secondsCountInHour)

export const transformSecondsCountToWordExpression = (
  secondsCount: number
): string => {
  if (secondsCount < secondsCountInMinute) {
    return `${secondsCount} сек`
  } else if (secondsCount < secondsCountInHour) {
    return `${getMinutes(secondsCount)} мин ${getSeconds(secondsCount)} сек`
  } else {
    const remainingSeconds = secondsCount % secondsCountInHour
    return `${getHours(secondsCount)} час ${getMinutes(
      remainingSeconds
    )} мин ${getSeconds(remainingSeconds)} сек`
  }
}

export const getRatingResult = (
  userId: number,
  leaderboard: TLeaderboard
): number => {
  let result = 0

  for (let i = 0; i < leaderboard.length; i++) {
    if (leaderboard[i].data.id === userId) {
      return (result = i + 1)
    }
  }
  return result
}

export const getStartIndex = (start = 0, quantity = 3) => {
  if (start === 1 || start < 0) return 0
  return (start - 1) * quantity
}

export const getTopicId = () => {
  return +location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
}

export const getPartComments = (arr: TThread[], pageNum: number) => {
  if (pageNum === 1 || pageNum < 0) return arr.slice(0, 3)
  return arr.slice((pageNum - 1) * 3, (pageNum - 1) * 3 + 3)
}

export const isClient = () => typeof window !== 'undefined'

export const getLocationOrigin = (): string => location.origin
