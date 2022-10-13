const secondsCountInMinute = 60;
const secondsCountInHour = 3600;

const getSeconds = (secondsCount: number): number => Math.floor(secondsCount % secondsCountInMinute);
const getMinutes = (secondsCount: number): number => Math.floor(secondsCount / secondsCountInMinute);
const getHours = (secondsCount: number): number => Math.floor(secondsCount / secondsCountInHour);

export const transformSecondsCountToWordExpression = (secondsCount: number): string => {
  if(secondsCount < secondsCountInMinute) {
    return `${secondsCount} сек`;
  } else if(secondsCount < secondsCountInHour) {
    return `${getMinutes(secondsCount)} мин ${getSeconds(secondsCount)} сек`;
  } else {
    const remainingSeconds = secondsCount % secondsCountInHour;
    return `${getHours(secondsCount)} час ${getMinutes(remainingSeconds)} мин ${getSeconds(remainingSeconds)} сек`;
  }
}