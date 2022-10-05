import React from 'react';
import { TextFieldProfile } from '../../components/ui';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../router/types';
import "./styles.scss";

export const ProfilePage = (): JSX.Element => (
  <div className="profile">
    <Avatar
      alt="Аватар"
      src="https://mui.com/static/images/avatar/1.jpg"
      sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
    />
    <div className="profile__form">
      <TextFieldProfile type="text" label="Почта" value="test@yandex.ru" readOnly={true}/>
      <TextFieldProfile type="text" label="Логин" value="test_login" readOnly={true}/>
      <TextFieldProfile type="text" label="Имя" value="first_name" readOnly={true}/>
      <TextFieldProfile type="text" label="Фамилия" value="second_name" readOnly={true}/>
      <TextFieldProfile type="text" label="Отображаемое имя" value="display_name" readOnly={true}/>
      <TextFieldProfile type="tel" label="Телефон" value="89991234567" readOnly={true}/>
      <br/>
      <Link to={ROUTES.EDIT_PROFILE}>Изменить данные</Link>
      <Link to={ROUTES.EDIT_PASSWORD}>Изменить пароль</Link>
      <a href="#" className="red">Выйти</a>
    </div>
  </div>
  )