"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllLeaderboard = exports.addPlayerToLeaderboard = exports.setLeaderboardToLocalStorage = void 0;
const axios_1 = require("../axios");
const index_1 = require("../index");
const setLeaderboardToLocalStorage = (leaderboard) => __awaiter(void 0, void 0, void 0, function* () {
    localStorage.setItem(index_1.STORE_NAME.LEADERBOARD, JSON.stringify(leaderboard));
});
exports.setLeaderboardToLocalStorage = setLeaderboardToLocalStorage;
const addPlayerToLeaderboard = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, axios_1.axiosInstance)(index_1.ENDPOINT.LEADERBOARD, {
            method: "post",
            data,
        });
        return result.data;
    }
    catch (error) {
        console.log(error);
    }
});
exports.addPlayerToLeaderboard = addPlayerToLeaderboard;
const getAllLeaderboard = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, axios_1.axiosInstance)(index_1.ENDPOINT.ALLLEADERBOARD, {
            method: "post",
            data,
        });
        const leaderboard = result.data;
        yield (0, exports.setLeaderboardToLocalStorage)(leaderboard);
        return leaderboard;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllLeaderboard = getAllLeaderboard;
