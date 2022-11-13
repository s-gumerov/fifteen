import { grey } from '@mui/material/colors';

export const TextFieldMultilineStyles = {
  mt: '10px',
  "& .MuiInputBase-root": {
    color: grey[300],
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    borderRadius: '4px',
    width: '530px',
    border: 'none',
    '&:before': {
      border: 'none',
    },
    "&:after": {
      border: 'none',
    },
    "&:hover:not(.Mui-disabled):before": {
      border: 'none',
    },
    "&:placeholder": {
      color: "gray"
    },
  },
  "& .MuiInputLabel-root": {
    color: "gray"
  },
  "& .MuiFormLabel-root.MuiFormLabel-filled": {
    color: "gray"
  },
  "& .MuiFormLabel-root.Mui-focused": {
    color: "white"
  },
}