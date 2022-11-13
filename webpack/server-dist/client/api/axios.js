"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.axiosInstance = void 0;
const axios_1 = __importDefault(require("axios"));
const const_1 = require("./const");
exports.axiosInstance = axios_1.default.create({
    baseURL: const_1.BASE_URL_API,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});
