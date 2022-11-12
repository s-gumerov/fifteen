import * as Yup from 'yup';
import { loginRegexp, passwordRegexp } from '../../utils/validation_regexps';

export const INITIAL_FORM_STATE = {
  login: '',
  password: '',
};

export const AUTH_VALIDATION_SCHEMA = Yup.object().shape({
  login: Yup.string()
    .required('Введите, пожалуйста, логин!')
    .min(2, 'Слишком короткий логин!')
    .max(20, 'Слишком длинный логин!')
    .matches(loginRegexp, 'Латиница, цифры, может содержать "-" и "_"'),
  password: Yup.string()
    .required('Введите, пожалуйста, пароль!')
    .min(8, 'Пароль от 8 символов!')
    .max(20, 'Пароль не более 20 символов!')
    .matches(passwordRegexp, ' Должен содержать хотя бы одну заглавную букву и цифру'),
});