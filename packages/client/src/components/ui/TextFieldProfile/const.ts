import { grey } from '@mui/material/colors'

export const TextFieldProfileStyles = {
  '& .MuiInputBase-root': {
    color: grey[300],
    '&:before': {
      borderColor: 'white',
    },
    '&:after': {
      borderColor: 'white',
    },
    '&:hover:not(.Mui-disabled):before': {
      borderColor: 'white',
    },
  },
  '& .MuiInputAdornment-standard p': {
    color: 'gray',
  },
  '& .MuiInputBase-input': {
    textAlign: 'right',
  },
  mt: 2,
}
