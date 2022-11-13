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
exports.EDIT_PROFILE_VALIDATION_SCHEMA = exports.INITIAL_FORM_STATE = void 0;
const Yup = __importStar(require("yup"));
const validation_regexps_1 = require("../../utils/validation_regexps");
exports.INITIAL_FORM_STATE = {
    id: 0,
    email: '',
    login: '',
    first_name: '',
    second_name: '',
    display_name: '',
    phone: '',
    old_password: '',
    password: '',
    password_again: '',
};
exports.EDIT_PROFILE_VALIDATION_SCHEMA = Yup.object().shape({
    email: Yup.string().email('Некорректный email!').required('Введите, пожалуйста, email!'),
    login: Yup.string()
        .required('Введите, пожалуйста, логин!')
        .min(2, 'Слишком короткий логин!')
        .max(20, 'Слишком длинный логин!')
        .matches(validation_regexps_1.loginRegexp, 'Латиница, цифры, может содержать "-" и "_"'),
    first_name: Yup.string()
        .required('Введите, пожалуйста, имя!')
        .matches(validation_regexps_1.nameRegexp, 'Латиница или кириллица, первая буква заглавная'),
    second_name: Yup.string()
        .required('Введите, пожалуйста, фамилию!')
        .matches(validation_regexps_1.nameRegexp, 'Латиница или кириллица, первая буква заглавная'),
    display_name: Yup.string()
        .required('Введите, пожалуйста, имя для форума!')
        .nullable(true)
        .matches(validation_regexps_1.displayNameRegexp, 'Латиница, первая буква заглавная'),
    phone: Yup.string()
        .required('Введите, пожалуйста, телефон!')
        .min(10, 'Короткий номер телефона!')
        .max(15, 'Слишком длинный номер телефона!')
        .matches(validation_regexps_1.phoneRegexp, 'от 10 до 15 цифр, может начинаться с плюса'),
});
