import { SxProps } from '@mui/material'
import {useAppSelector} from '../../hooks/useAppDispatch';

const {theme} = useAppSelector(state => state.theme)
export const defaultStyles: SxProps = {
  color: theme==='darkTheme'?'#FA4374':'#93dfff',
  margin: 0,
  padding: 0,
  width: '55px',
  height: '55px',
  position: 'absolute',
  top: '25px',
  right: '25px',
}
