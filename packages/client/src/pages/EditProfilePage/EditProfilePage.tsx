import React from 'react'
import { TextFieldProfile } from '../../components/ui'
import {Avatar, Button, SxProps} from '@mui/material'
import { Form, Formik } from 'formik'
import {
  EDIT_PROFILE_VALIDATION_SCHEMA,
  INITIAL_FORM_STATE,
} from './validation-schema'
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch'
import { TUserInfo } from '../../api'
import {
  changeAvatarByThunk,
  changeProfileByThunk,
} from '../../store/user/userSlice'
import './styles.scss'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../router/types'

export const EditProfilePage = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const navigation = useNavigate()
  const { user } = useAppSelector(state => state.user)
  const {theme} = useAppSelector(state => state.theme)
  const themeStyles: SxProps = theme === 'darkTheme' ?
      {
        backgroundColor: '#4044ed'
      }
      :
      {
        backgroundColor: '#ED40DC',
        '&:hover': {
          backgroundColor: '#ED40DC',
        },
      }
  const handleSubmit = async (values: TUserInfo) => {
    await dispatch(changeProfileByThunk(values))
    navigation(ROUTES.PROFILE)
  }

  const fileSelectedHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const formData = new FormData()
    const file = e.target.files?.[0]
    formData.append('avatar', file!)
    await dispatch(changeAvatarByThunk(formData))
  }

  return (
    <div className="profile">
      <Formik
        enableReinitialize={true}
        initialValues={user ?? INITIAL_FORM_STATE}
        validationSchema={EDIT_PROFILE_VALIDATION_SCHEMA}
        onSubmit={handleSubmit}>
        <Form>
          <label htmlFor="inputAvatar">
            <input
              accept="image/*"
              id="inputAvatar"
              type="file"
              onChange={fileSelectedHandler}
            />
            <Avatar
              alt="Аватар"
              src={user?.avatar ?? 'https://mui.com/static/images/avatar/1.jpg'}
              sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
            />
          </label>

          <div className="profile__form">
            <TextFieldProfile
              fullWidth
              name="email"
              type="text"
              label="Почта"
            />
            <TextFieldProfile
              fullWidth
              name="login"
              type="text"
              label="Логин"
            />
            <TextFieldProfile
              fullWidth
              name="first_name"
              type="text"
              label="Имя"
            />
            <TextFieldProfile
              fullWidth
              name="second_name"
              type="text"
              label="Фамилия"
            />
            <TextFieldProfile
              fullWidth
              name="display_name"
              type="text"
              label="Отображаемое имя"
            />
            <TextFieldProfile
              fullWidth
              name="phone"
              type="tel"
              label="Телефон"
            />
            <Button
              variant="contained"
              size="large"
              type="submit"
              sx={{ mt: 4, ...themeStyles}}>
              Сохранить
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}
