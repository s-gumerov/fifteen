import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { Formik, Form } from 'formik';
import { TextFieldAuth } from '../../components/ui';
import { ROUTES } from '../../router/types';
import { INITIAL_FORM_STATE, AUTH_VALIDATION_SCHEMA } from './validation-schema';

export const AuthPage = (): JSX.Element => {
  const handleSubmit = () => console.log('Форма отправлена..')

  return (
    <div className="auth">
      <h1 className="auth__title title">Авторизация</h1>
      <div className="auth__form">
        <Formik
          initialValues={{ ...INITIAL_FORM_STATE }}
          validationSchema={AUTH_VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          <Form>
            <TextFieldAuth fullWidth name="login" type="text" label="Логин" />
            <TextFieldAuth fullWidth name="password" type="password" label="Пароль" />
            <Button fullWidth type="submit" variant="contained" size="large" sx={{ mt: 4 }}>Войти</Button>
          </Form>
        </Formik>
        <Link to={ROUTES.SIGNUP}>Зарегистрироваться</Link>
      </div>
    </div>
  )
}