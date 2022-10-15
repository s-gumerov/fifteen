import {tempUsers} from "../pages";
import {TLeaders} from "../pages/LeadersPage/types";

const secondsCountInMinute = 60;
const secondsCountInHour = 3600;

const getSeconds = (secondsCount: number): number => Math.floor(secondsCount % secondsCountInMinute);
const getMinutes = (secondsCount: number): number => Math.floor(secondsCount / secondsCountInMinute);
const getHours = (secondsCount: number): number => Math.floor(secondsCount / secondsCountInHour);

export const transformSecondsCountToWordExpression = (secondsCount: number): string => {
  if (secondsCount < secondsCountInMinute) {
    return `${secondsCount} сек`;
  } else if (secondsCount < secondsCountInHour) {
    return `${getMinutes(secondsCount)} мин ${getSeconds(secondsCount)} сек`;
  } else {
    const remainingSeconds = secondsCount % secondsCountInHour;
    return `${getHours(secondsCount)} час ${getMinutes(remainingSeconds)} мин ${getSeconds(remainingSeconds)} сек`;
  }
}

export const updateGameResult = (steps: number, time: number) => {
  tempUsers.map((el) => {
      if (el.userName === "Ты") {
        if (steps < el.moves) {
          el.moves = steps
          el.time = time.toString()
        }
      }
    })
}

export const getRatingResult = (ratingList: TLeaders): number => {
  let result = 0;
  ratingList.sort((a, b) => a.moves - b.moves).forEach(el => {
    if (el.userName === "Ты") result = tempUsers.indexOf(el) + 1
  })
  return result
}

