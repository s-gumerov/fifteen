import React from 'react';
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { TextFieldAuth } from '../../components/ui';
import { ROUTES } from '../../router/types'

export const AuthPage = (): JSX.Element => (
    <div className="auth">
      <h1 className="auth__title title">Авторизация</h1>
      <div className="auth__form">
        <TextFieldAuth type="text" label="Логин"/>
        <TextFieldAuth type="password" label="Пароль"/>
        <Button variant="contained" size="large" sx={{ mt: 4, mb: 2 }}>Войти</Button>
        <Link to={ROUTES.SIGNUP}>Зарегистрироваться</Link>
      </div>
    </div>
  )