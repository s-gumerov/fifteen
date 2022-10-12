import * as Yup from 'yup';
import { loginRegexp, nameRegexp, passwordRegexp, phoneRegexp } from '../../utils/validation_regexps';

export const INITIAL_FORM_STATE = {
  email: '',
  login: '',
  first_name: '',
  second_name: '',
  phone: '',
  password: '',
  password_again: '',
};

export const SIGNUP_VALIDATION_SCHEMA = Yup.object().shape({
  email: Yup.string().email('Некорректный email!').required('Введите, пожалуйста, email!'),
  login: Yup.string()
    .required('Введите, пожалуйста, логин!')
    .min(2, 'Слишком короткий логин!')
    .max(20, 'Слишком длинный логин!')
    .matches(loginRegexp, 'Латиница, цифры, может содержать "-" и "_"'),
  first_name: Yup.string()
    .required('Введите, пожалуйста, имя!')
    .matches(nameRegexp, 'Латиница или кириллица, первая буква заглавная'),
  second_name: Yup.string()
    .required('Введите, пожалуйста, фамилию!')
    .matches(nameRegexp, 'Латиница или кириллица, первая буква заглавная'),
  phone: Yup.string()
    .required('Введите, пожалуйста, телефон!')
    .min(10, 'Короткий номер телефона!')
    .max(15, 'Слишком длинный номер телефона!')
    .matches(phoneRegexp, 'от 10 до 15 цифр, может начинаться с плюса'),
  password: Yup.string()
    .required('Введите, пожалуйста, пароль!')
    .min(8, 'Пароль от 8 символов!')
    .max(20, 'Пароль не более 20 символов!')
    .matches(passwordRegexp, ' Должен содержать хотя бы одну заглавную букву и цифру'),
  password_again: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать!')
});