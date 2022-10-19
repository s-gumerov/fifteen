import React from 'react';
import { TextFieldProfile } from '../../components/ui';
import { Avatar, Button } from '@mui/material';
import { Form, Formik } from 'formik';
import { EDIT_PROFILE_VALIDATION_SCHEMA, INITIAL_FORM_STATE } from "./validation-schema"

export const EditProfilePage = (): JSX.Element => {
    const handleSubmit = () => console.log('Форма отправлена..')

    return (
        <div className="profile">
            <Formik
                initialValues={{...INITIAL_FORM_STATE}}
                validationSchema={EDIT_PROFILE_VALIDATION_SCHEMA}
                onSubmit={handleSubmit}
            >
                <Form>
                    <Avatar
                        alt="Аватар"
                        src="https://mui.com/static/images/avatar/1.jpg"
                        sx={{width: 120, height: 120, mx: "auto", mb: 2}}
                    />
                    <div className="profile__form">
                        <TextFieldProfile fullWidth name="email" type="text" label="Почта" />
                        <TextFieldProfile fullWidth name="login" type="text" label="Логин" />
                        <TextFieldProfile fullWidth name="first_name" type="text" label="Имя" />
                        <TextFieldProfile fullWidth name="second_name" type="text" label="Фамилия" />
                        <TextFieldProfile fullWidth name="display_name" type="text" label="Отображаемое имя" />
                        <TextFieldProfile fullWidth name="phone" type="tel" label="Телефон" />
                        <Button variant="contained" size="large" sx={{mt: 4}}>Сохранить</Button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}
