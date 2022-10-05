import React from 'react';
import { TextFieldProfile } from '../../components/ui';
import { Avatar, Button } from '@mui/material';

export const EditProfilePage = (): JSX.Element => (
  <div className="profile">
    <Avatar
      alt="Аватар"
      src="https://mui.com/static/images/avatar/1.jpg"
      sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
    />
    <div className="profile__form">
      <TextFieldProfile type="text" label="Почта" value="test@yandex.ru" />
      <TextFieldProfile type="text" label="Логин" value="test_login" />
      <TextFieldProfile type="text" label="Имя" value="first_name" />
      <TextFieldProfile type="text" label="Фамилия" value="second_name" />
      <TextFieldProfile type="text" label="Отображаемое имя" value="display_name" />
      <TextFieldProfile type="tel" label="Телефон" value="89991234567" />
      <Button variant="contained" size="large" sx={{ mt: 4 }}>Сохранить</Button>
    </div>
  </div>
)