const getSeconds = (secondsCount: number): number => Math.floor(secondsCount % 60);
const getMinutes = (secondsCount: number): number => Math.floor(secondsCount / 60);
const getHours = (secondsCount: number): number => Math.floor(secondsCount / 3600);

export const transformSecondsCountToWordExpression = (secondsCount: number): string => {
  if(secondsCount < 60) {
    return `${secondsCount} сек`;
  } else if(secondsCount < 3600) {
    return `${getMinutes(secondsCount)} мин ${getSeconds(secondsCount)} сек`;
  } else return `${getHours(secondsCount)} час ${getMinutes(secondsCount)} мин ${getSeconds(secondsCount)} сек`;
}