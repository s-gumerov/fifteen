"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRatingResult = exports.transformSecondsCountToWordExpression = void 0;
const secondsCountInMinute = 60;
const secondsCountInHour = 3600;
const getSeconds = (secondsCount) => Math.floor(secondsCount % secondsCountInMinute);
const getMinutes = (secondsCount) => Math.floor(secondsCount / secondsCountInMinute);
const getHours = (secondsCount) => Math.floor(secondsCount / secondsCountInHour);
const transformSecondsCountToWordExpression = (secondsCount) => {
    if (secondsCount < secondsCountInMinute) {
        return `${secondsCount} сек`;
    }
    else if (secondsCount < secondsCountInHour) {
        return `${getMinutes(secondsCount)} мин ${getSeconds(secondsCount)} сек`;
    }
    else {
        const remainingSeconds = secondsCount % secondsCountInHour;
        return `${getHours(secondsCount)} час ${getMinutes(remainingSeconds)} мин ${getSeconds(remainingSeconds)} сек`;
    }
};
exports.transformSecondsCountToWordExpression = transformSecondsCountToWordExpression;
const getRatingResult = (userId, leaderboard) => {
    let result = 0;
    for (let i = 0; i < leaderboard.length; i++) {
        if (leaderboard[i].data.id === userId) {
            return result = i + 1;
        }
    }
    return result;
};
exports.getRatingResult = getRatingResult;
