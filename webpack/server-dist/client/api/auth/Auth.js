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
exports.logout = exports.getUserInfo = exports.authorize = exports.signUp = exports.setUserToLocalStorage = void 0;
const axios_1 = require("../axios");
const index_1 = require("../index");
const setUserToLocalStorage = () => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield (0, exports.getUserInfo)();
    localStorage.setItem(index_1.STORE_NAME.USER, JSON.stringify(userInfo));
});
exports.setUserToLocalStorage = setUserToLocalStorage;
const signUp = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, axios_1.axiosInstance)('/api/v2/auth/signup', {
            method: "post",
            data,
        });
        yield (0, exports.setUserToLocalStorage)();
        return result.data;
    }
    catch (error) {
        console.log(error);
    }
});
exports.signUp = signUp;
const authorize = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, axios_1.axiosInstance)('/api/v2/auth/signin', {
            method: "post",
            data,
        });
        yield (0, exports.setUserToLocalStorage)();
        return result.data;
    }
    catch (error) {
        console.log(error);
    }
});
exports.authorize = authorize;
const getUserInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, axios_1.axiosInstance)('/api/v2/auth/user', {
            method: "get"
        });
        return result.data;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUserInfo = getUserInfo;
const logout = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, axios_1.axiosInstance)('/api/v2/auth/logout', {
            method: "post",
        });
        localStorage.removeItem(index_1.STORE_NAME.USER);
    }
    catch (error) {
        return error;
    }
});
exports.logout = logout;
