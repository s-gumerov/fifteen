import TextField from '@mui/material/TextField';
import { TextFieldMultilineProps } from './types'
import { TextFieldMultilineStyles } from './const'

export const TextFieldMultiline = (
  {
    label,
    placeholder,
    rows,
    id,
    name
  }: TextFieldMultilineProps
): JSX.Element => (
  <TextField
    id={id}
    name={name}
    label={label}
    placeholder={placeholder}
    multiline
    rows={rows}
    variant="standard"
    sx={TextFieldMultilineStyles}
  />
)
