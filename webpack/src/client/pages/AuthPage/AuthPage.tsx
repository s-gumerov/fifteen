import React from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {Button} from '@mui/material';
import {Formik, Form} from 'formik';
import {TextFieldAuth} from '../../components/ui';
import {ROUTES} from '../../router/types';
import {INITIAL_FORM_STATE, AUTH_VALIDATION_SCHEMA} from './validation-schema';
import {REDIRECT_URI, TAuthData} from '../../api';
import {useAuth} from '../../context';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {authorizeByThunk} from '../../store/user/userSlice'
import './styles.scss'
import {getServiceId} from "../../api/OAuth";

const img = require('../../assets/yaAuthBtn.svg');

export const AuthPage = (): JSX.Element => {
  const authContext = useAuth();
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const yaAuth = new Image()
  yaAuth.src = img
  const handleSubmit = async (values: TAuthData) => {
    const res = await dispatch(authorizeByThunk(values));
    if (res.payload === "OK") {
      authContext?.setAuthorization(true);
      navigation(ROUTES.MAIN);
    }
  }

  const handleSubmitOAuth = async () => {
    const res = await getServiceId();
    const {service_id} = res;
    if(service_id) {
      window.location.replace(`https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=${REDIRECT_URI}`)
    }
  };

  return (
    <div className="auth">
      <h1 className="auth__title title">Авторизация</h1>
      <div className="auth__form">
        <Formik
          initialValues={{...INITIAL_FORM_STATE}}
          validationSchema={AUTH_VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          <Form>
            <TextFieldAuth fullWidth name="login" type="text" label="Логин"/>
            <TextFieldAuth fullWidth name="password" type="password" label="Пароль"/>
            <Button fullWidth type="submit" variant="contained" size="large" sx={{mt: 4}}>Войти</Button>
          </Form>
        </Formik>
        <Link to={ROUTES.SIGNUP}>Зарегистрироваться</Link>
      </div>
      <Button className="yaOAuth" onClick={handleSubmitOAuth} fullWidth type="submit" variant="contained" size="large"
              sx={{mt: 4}}>
        <img src={img} alt=""/>
      </Button>
    </div>
  )
}
