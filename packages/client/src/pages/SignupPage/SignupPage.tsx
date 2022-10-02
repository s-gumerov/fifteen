import React from 'react';
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { TextFieldAuth } from '../../components/ui';
import { ROUTES } from '../../router/types'
import "./styles.scss";

export const SignupPage = (): JSX.Element => (
    <div className="auth">
      <h1 className="auth__title title">Регистрация</h1>
      <div className="auth__form">
        <TextFieldAuth type="text" label="Почта"/>
        <TextFieldAuth type="text" label="Логин"/>
        <TextFieldAuth type="text" label="Имя"/>
        <TextFieldAuth type="text" label="Фамилия"/>
        <TextFieldAuth type="tel" label="Телефон"/>
        <TextFieldAuth type="password" label="Пароль"/>
        <TextFieldAuth type="password" label="Пароль (еще раз)"/>
        <Button variant="contained" size="large" sx={{ mt: 4 }}>Зарегистрироваться</Button>
        <Link to={ROUTES.AUTH}>Войти</Link>
      </div>
    </div>
  )