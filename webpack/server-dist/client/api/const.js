"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENDPOINT = exports.STORE_NAME = exports.HTTP_STATUS_CODE = exports.REDIRECT_URI = exports.BASE_URL_API = void 0;
exports.BASE_URL_API = 'https://ya-praktikum.tech';
exports.REDIRECT_URI = `http://${location.host}`;
var HTTP_STATUS_CODE;
(function (HTTP_STATUS_CODE) {
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["OK"] = 200] = "OK";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HTTP_STATUS_CODE[HTTP_STATUS_CODE["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HTTP_STATUS_CODE = exports.HTTP_STATUS_CODE || (exports.HTTP_STATUS_CODE = {}));
var STORE_NAME;
(function (STORE_NAME) {
    STORE_NAME["USER"] = "fifteenUserStore";
    STORE_NAME["LEADERBOARD"] = "fifteenLeaderboardStore";
})(STORE_NAME = exports.STORE_NAME || (exports.STORE_NAME = {}));
var ENDPOINT;
(function (ENDPOINT) {
    ENDPOINT["LEADERBOARD"] = "/api/v2/leaderboard";
    ENDPOINT["ALLLEADERBOARD"] = "/api/v2/leaderboard/all";
    ENDPOINT["SERVICE_ID"] = "/api/v2/oauth/yandex/service-id";
})(ENDPOINT = exports.ENDPOINT || (exports.ENDPOINT = {}));
