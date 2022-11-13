import { grey } from '@mui/material/colors';

export const TextFieldAuthStyles = {
  "& .MuiInputBase-root": {
    color: grey[300],
    '&:before': {
      borderColor: "white",
    },
    "&:after": {
      borderColor: "white",
    },
    "&:hover:not(.Mui-disabled):before": {
      borderColor: "white",
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