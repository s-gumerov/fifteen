"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EDIT_PASSWORD_VALIDATION_SCHEMA = exports.INITIAL_FORM_STATE = void 0;
const Yup = __importStar(require("yup"));
const validation_regexps_1 = require("../../utils/validation_regexps");
exports.INITIAL_FORM_STATE = {
    oldPassword: '',
    newPassword: '',
    password_again: '',
};
exports.EDIT_PASSWORD_VALIDATION_SCHEMA = Yup.object().shape({
    oldPassword: Yup.string()
        .required('Введите, пожалуйста, пароль!')
        .min(8, 'Пароль от 8 символов!')
        .max(20, 'Пароль не более 20 символов!')
        .matches(validation_regexps_1.passwordRegexp, ' Должен содержать хотя бы одну заглавную букву и цифру'),
    newPassword: Yup.string()
        .required('Введите, пожалуйста, пароль!')
        .min(8, 'Пароль от 8 символов!')
        .max(20, 'Пароль не более 20 символов!')
        .matches(validation_regexps_1.passwordRegexp, ' Должен содержать хотя бы одну заглавную букву и цифру'),
    password_again: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Пароли должны совпадать!')
});
