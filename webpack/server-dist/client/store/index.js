"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const userSlice_1 = __importDefault(require("./user/userSlice"));
const leaderboardSlice_1 = __importDefault(require("./leaderboard/leaderboardSlice"));
const store = (0, toolkit_1.configureStore)({
    reducer: {
        user: userSlice_1.default,
        leaderboard: leaderboardSlice_1.default
    }
});
exports.default = store;
