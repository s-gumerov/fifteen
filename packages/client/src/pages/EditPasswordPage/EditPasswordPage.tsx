import React from 'react'
import { TextFieldProfile } from '../../components/ui'
import { Avatar, Button } from '@mui/material'
import { Form, Formik } from 'formik'
import {
  EDIT_PASSWORD_VALIDATION_SCHEMA,
  INITIAL_FORM_STATE,
} from './validation-schema'
import { useAppSelector } from '../../hooks/useAppDispatch'
import { changePassword } from '../../store/user/userSlice'
import { TUserPassword } from '../../api'

export const EditPasswordPage = (): JSX.Element => {
  const { user } = useAppSelector(state => state.user)
  const handleSubmit = (values: TUserPassword) => {
    changePassword(values)
  }

  return (
    <div className="profile">
      <Formik
        enableReinitialize={true}
        initialValues={{ ...INITIAL_FORM_STATE }}
        validationSchema={EDIT_PASSWORD_VALIDATION_SCHEMA}
        onSubmit={handleSubmit}>
        <Form>
          <Avatar
            alt="Аватар"
            src={user?.avatar || 'https://mui.com/static/images/avatar/1.jpg'}
            sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
          />
          <div className="profile__form">
            <TextFieldProfile
              fullWidth
              name="oldPassword"
              type="password"
              label="Старый пароль"
            />
            <TextFieldProfile
              fullWidth
              name="newPassword"
              type="password"
              label="Новый пароль"
            />
            <TextFieldProfile
              fullWidth
              name="password_again"
              type="password"
              label="Повторите новый пароль"
            />
            <Button
              variant="contained"
              size="large"
              type="submit"
              sx={{ mt: 4 }}>
              Сохранить
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}
