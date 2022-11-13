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
exports.addPlayerToLeaderboardByThunk = exports.getLeaderboardByThunk = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const api_1 = require("../../api");
const api_2 = require("../../api");
const axios_1 = require("../../api/axios");
const types_1 = require("./types");
const const_1 = require("../../const");
const isError_1 = require("../../utils/isError");
exports.getLeaderboardByThunk = (0, toolkit_1.createAsyncThunk)(types_1.LeaderboardReducerTypes.allLeaderboard, function (data, { dispatch }) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, axios_1.axiosInstance)(api_1.ENDPOINT.ALLLEADERBOARD, {
            method: "post",
            data,
        });
        localStorage.setItem(api_2.STORE_NAME.LEADERBOARD, JSON.stringify(response.data.payload));
        return response.data;
    });
});
exports.addPlayerToLeaderboardByThunk = (0, toolkit_1.createAsyncThunk)(types_1.LeaderboardReducerTypes.leaderboard, function (data, { dispatch }) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, axios_1.axiosInstance)(api_1.ENDPOINT.LEADERBOARD, {
            method: "post",
            data,
        });
        yield dispatch((0, exports.getLeaderboardByThunk)(const_1.leaderboardDefaultQuery));
        return response.data;
    });
});
const initialState = {
    leaderboard: null,
    error: null,
    status: null,
};
const leaderboardSlice = (0, toolkit_1.createSlice)({
    name: 'leaderboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(exports.getLeaderboardByThunk.pending, (state) => {
            state.status = 'FETCHING';
            state.error = null;
        })
            .addCase(exports.getLeaderboardByThunk.fulfilled, (state, action) => {
            state.leaderboard = action.payload;
            state.error = null;
            state.status = 'FETCH_FULFILLED';
        })
            .addCase(exports.addPlayerToLeaderboardByThunk.fulfilled, (state) => {
            state.leaderboard = null;
            state.error = null;
            state.status = null;
        })
            .addMatcher(isError_1.isError, (state, action) => {
            var _a;
            state.leaderboard = null;
            state.error = (_a = action.payload) !== null && _a !== void 0 ? _a : 'Error!';
            state.status = 'FETCH_FAILED';
        });
    }
});
exports.default = leaderboardSlice.reducer;
