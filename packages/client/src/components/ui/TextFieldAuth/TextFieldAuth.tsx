import React from 'react'
import { TextField } from '@mui/material'
import { useField } from 'formik'
import { TextFieldProps } from '@mui/material'
import { TextFieldAuthStyles } from './const'

export const TextFieldAuth = ({
  name,
  ...propsWithoutName
}: TextFieldProps): JSX.Element => {
  const [field, meta] = useField(name as string)

  const configTextField = {
    ...field,
    ...propsWithoutName,
  }

  if (meta && meta.touched && meta.error) {
    configTextField.error = true
    configTextField.helperText = meta.error
  }

  return (
    <TextField
      {...configTextField}
      variant="standard"
      sx={TextFieldAuthStyles}
    />
  )
}
