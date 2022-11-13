"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordRegexp = exports.phoneRegexp = exports.nameRegexp = exports.displayNameRegexp = exports.loginRegexp = void 0;
exports.loginRegexp = /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/;
exports.displayNameRegexp = /^[A-Z][a-zA-Z._-]+$/;
exports.nameRegexp = /^[A-ZА-ЯЁ][a-zA-Zа-яА-ЯёЁ-]+$/;
exports.phoneRegexp = /^\+*\d{10,15}$/;
exports.passwordRegexp = /(?<!\S)(?=\S{8,20}(?!\S))\S*(\d\S*[A-ZА-ЯЁ]|[A-ZА-ЯЁ]\S*\d)\S*/;
