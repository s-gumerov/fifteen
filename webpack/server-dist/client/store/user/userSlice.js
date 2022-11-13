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
exports.changePassword = exports.changeAvatarByThunk = exports.changeProfileByThunk = exports.logoutByThunk = exports.signUpByThunk = exports.authorizeByThunk = exports.getUserInfoByThunk = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const api_1 = require("../../api");
const axios_1 = require("../../api/axios");
const types_1 = require("./types");
const isError_1 = require("../../utils/isError");
exports.getUserInfoByThunk = (0, toolkit_1.createAsyncThunk)(types_1.userReducerTypes.getUserInfo, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, axios_1.axiosInstance)('/api/v2/auth/user', {
            method: "get"
        });
        response.data.avatar = `${api_1.BASE_URL_API}/api/v2/resources${response.data.avatar}`;
        return response.data;
    });
});
exports.authorizeByThunk = (0, toolkit_1.createAsyncThunk)(types_1.userReducerTypes.authorize, function (data, { dispatch }) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, axios_1.axiosInstance)('/api/v2/auth/signin', {
            method: "post",
            data,
        });
        const userInfo = yield dispatch((0, exports.getUserInfoByThunk)());
        localStorage.setItem(api_1.STORE_NAME.USER, JSON.stringify(userInfo.payload));
        return response.data;
    });
});
exports.signUpByThunk = (0, toolkit_1.createAsyncThunk)(types_1.userReducerTypes.authorize, function (data, { dispatch }) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, axios_1.axiosInstance)('/api/v2/auth/signup', {
            method: "post",
            data,
        });
        const userInfo = yield dispatch((0, exports.getUserInfoByThunk)());
        localStorage.setItem(api_1.STORE_NAME.USER, JSON.stringify(userInfo.payload));
        return response.data;
    });
});
exports.logoutByThunk = (0, toolkit_1.createAsyncThunk)(types_1.userReducerTypes.logout, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, axios_1.axiosInstance)('/api/v2/auth/logout', {
            method: "post",
        });
        localStorage.removeItem(api_1.STORE_NAME.USER);
        return response.data;
    });
});
exports.changeProfileByThunk = (0, toolkit_1.createAsyncThunk)(types_1.userReducerTypes.changeProfile, function (data, { dispatch }) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, axios_1.axiosInstance)('/api/v2/user/profile', {
            method: "put",
            data,
        });
        response.data.avatar = `${api_1.BASE_URL_API}/api/v2/resources${response.data.avatar}`;
        const userInfo = yield dispatch((0, exports.getUserInfoByThunk)());
        localStorage.setItem(api_1.STORE_NAME.USER, JSON.stringify(userInfo.payload));
        return response.data;
    });
});
exports.changeAvatarByThunk = (0, toolkit_1.createAsyncThunk)(types_1.userReducerTypes.changeAvatar, function (data, { dispatch }) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, axios_1.axiosInstance)('/api/v2/user/profile/avatar', {
            method: "put",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data,
        });
        response.data.avatar = `${api_1.BASE_URL_API}/api/v2/resources${response.data.avatar}`;
        const userInfo = yield dispatch((0, exports.getUserInfoByThunk)());
        localStorage.setItem(api_1.STORE_NAME.USER, JSON.stringify(userInfo.payload));
        return response.data;
    });
});
const changePassword = function (data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, axios_1.axiosInstance)('/api/v2/user/password', {
            method: "put",
            data,
        });
    });
};
exports.changePassword = changePassword;
const initialState = {
    user: null,
    error: null,
    status: null,
};
const userSlice = (0, toolkit_1.createSlice)({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(exports.getUserInfoByThunk.pending, (state) => {
            state.status = 'FETCHING';
            state.error = null;
        })
            .addCase(exports.getUserInfoByThunk.fulfilled, (state, action) => {
            state.user = action.payload;
            if (state.user.display_name === null)
                state.user.display_name = action.payload.login;
            state.error = null;
            state.status = 'FETCH_FULFILLED';
        })
            .addCase(exports.logoutByThunk.fulfilled, (state) => {
            state.user = null;
            state.error = null;
            state.status = null;
        })
            .addCase(exports.changeProfileByThunk.fulfilled, (state, action) => {
            state.user = action.payload;
            state.error = null;
            state.status = 'FETCH_FULFILLED';
        })
            .addCase(exports.changeAvatarByThunk.fulfilled, (state, action) => {
            state.user = action.payload;
            state.error = null;
            state.status = 'FETCH_FULFILLED';
        })
            .addMatcher(isError_1.isError, (state, action) => {
            var _a;
            state.user = null;
            state.error = (_a = action.payload) !== null && _a !== void 0 ? _a : 'Error!';
            state.status = 'FETCH_FAILED';
        });
    }
});
exports.default = userSlice.reducer;
