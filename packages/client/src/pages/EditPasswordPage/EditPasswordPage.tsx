import React from 'react';
import { TextFieldProfile } from '../../components/ui';
import { Avatar, Button } from '@mui/material';

export const EditPasswordPage = (): JSX.Element => (
  <div className="profile">
    <Avatar
      alt="Аватар"
      src="https://mui.com/static/images/avatar/1.jpg"
      sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
    />
    <div className="profile__form">
      <TextFieldProfile type="password" label="Старый пароль" value="12345678" />
      <TextFieldProfile type="password" label="Новый пароль" />
      <TextFieldProfile type="password" label="Повторите новый пароль" />
      <Button variant="contained" size="large" sx={{ mt: 4 }}>Сохранить</Button>
    </div>
  </div>
)