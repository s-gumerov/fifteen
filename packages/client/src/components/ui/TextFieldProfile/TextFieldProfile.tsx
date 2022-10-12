import React from 'react';
import {TextField, TextFieldProps} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import {TextFieldProfileStyles} from './const';
import {useField} from "formik";

export const TextFieldProfile = ({ name, label, readOnly, ...propsWithoutNameAndLabel }: TextFieldProps & { readOnly?: boolean }): JSX.Element => {
    const [field, meta] = useField(name as string);
    const configTextField = {
        ...field,
        ...propsWithoutNameAndLabel,
    };

    if (meta && meta.touched && meta.error) {
        configTextField.error = true;
        configTextField.helperText = meta.error;
    }

    return (
        <TextField
            {...configTextField}
            variant="standard"
            sx={TextFieldProfileStyles}
            InputProps={{
                startAdornment: <InputAdornment position="start">{label}</InputAdornment>,
                readOnly
            }}
        />
    )
}
