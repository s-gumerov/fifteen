import React from 'react';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { TextFieldProfileProps } from './types';
import { TextFieldProfileStyles } from './const';

export const TextFieldProfile = ({ label, type, value, readOnly = false }: TextFieldProfileProps): JSX.Element => {
  const [valueInput, setValueInput] = React.useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(event.target.value);
  };

  return (
    <TextField
      value={valueInput}
      type={type}
      variant="standard"
      sx={TextFieldProfileStyles}
      InputProps={{
        startAdornment: <InputAdornment position="start">{label}</InputAdornment>,
        readOnly
      }}
      onChange={handleChange}
    />
  )
}