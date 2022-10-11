import React from 'react';
import {TextFieldProfile} from '../../components/ui';
import {Avatar} from '@mui/material';
import {Link} from 'react-router-dom';
import {ROUTES} from '../../router/types';
import "./styles.scss";
import {INITIAL_FORM_STATE} from "../EditProfilePage/validation-schema";
import { Form, Formik } from 'formik';

export const ProfilePage = (): JSX.Element => (
    <div className="profile">
        <Formik
            initialValues={{...INITIAL_FORM_STATE}}
            onSubmit={() => {console.log(`this console.log of the name of Formik's onSubmit is required option`)}}
        >
            <Form>
                <Avatar
                    alt="Аватар"
                    src="https://mui.com/static/images/avatar/1.jpg"
                    sx={{width: 120, height: 120, mx: "auto", mb: 2}}
                />
                <div className="profile__form">
                    <TextFieldProfile fullWidth name="email" type="text" label="Почта" readOnly={true} />
                    <TextFieldProfile fullWidth name="login" type="text" label="Логин" readOnly={true}/>
                    <TextFieldProfile fullWidth name="first_name" type="text" label="Имя" readOnly={true}/>
                    <TextFieldProfile fullWidth name="second_name" type="text" label="Фамилия" readOnly={true}/>
                    <TextFieldProfile fullWidth name="display_name" type="text" label="Отображаемое имя" readOnly={true}/>
                    <TextFieldProfile fullWidth name="phone" type="tel" label="Телефон" readOnly={true}/>
                    <br/>
                    <Link to={ROUTES.EDIT_PROFILE}>Изменить данные</Link>
                    <Link to={ROUTES.EDIT_PASSWORD}>Изменить пароль</Link>
                    <a href="#" className="red">Выйти</a>
                </div>
            </Form>
        </Formik>
    </div>
)
