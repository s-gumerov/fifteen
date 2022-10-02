import React from 'react';
import { TextField } from '@mui/material';
import { TextFieldAuthProps } from './types'
import { TextFieldAuthStyles } from './const'

export const TextFieldAuth = ({ label, type }: TextFieldAuthProps): JSX.Element => (
    <TextField
      label={label}
      type={type}
      variant="standard"
      sx={TextFieldAuthStyles}
    />
  )