import React from 'react';
import {TextFieldProfile} from '../../components/ui';
import {Avatar, Button} from '@mui/material';
import {INITIAL_FORM_STATE} from "../../services/initial-profile-states";
import {Form, Formik} from 'formik';
import {SIGNUP_VALIDATION_SCHEMA} from "../SignupPage/validation-schema";

export const EditPasswordPage = (): JSX.Element => {
    const handleSubmit = () => console.log('Форма отправлена..')

    return (
        <div className="profile">
            <Formik
                initialValues={{...INITIAL_FORM_STATE}}
                validationSchema={SIGNUP_VALIDATION_SCHEMA}
                onSubmit={handleSubmit}
            >
                <Form>
                    <Avatar
                        alt="Аватар"
                        src="https://mui.com/static/images/avatar/1.jpg"
                        sx={{width: 120, height: 120, mx: "auto", mb: 2}}
                    />
                    <div className="profile__form">
                        <TextFieldProfile fullWidth name="old_password" type="password" label="Старый пароль"/>
                        <TextFieldProfile fullWidth name="password" type="password" label="Новый пароль"/>
                        <TextFieldProfile fullWidth name="password_again" type="password" label="Повторите новый пароль"/>
                        <Button variant="contained" size="large" sx={{mt: 4}}>Сохранить</Button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}
