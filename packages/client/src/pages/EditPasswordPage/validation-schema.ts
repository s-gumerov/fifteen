import * as Yup from "yup";
import { passwordRegexp } from "../../utils/validation_regexps";

export const INITIAL_FORM_STATE = {
  old_password: '',
  password: '',
  password_again: '',
};
export const EDIT_PASSWORD_VALIDATION_SCHEMA = Yup.object().shape({
  old_password: Yup.string()
    .required('Введите, пожалуйста, пароль!')
    .min(8, 'Пароль от 8 символов!')
    .max(20, 'Пароль не более 20 символов!')
    .matches(passwordRegexp, ' Должен содержать хотя бы одну заглавную букву и цифру'),
  password: Yup.string()
    .required('Введите, пожалуйста, пароль!')
    .min(8, 'Пароль от 8 символов!')
    .max(20, 'Пароль не более 20 символов!')
    .matches(passwordRegexp, ' Должен содержать хотя бы одну заглавную букву и цифру'),
  password_again: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать!')
});
