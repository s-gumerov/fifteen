import {useState} from 'react'
import {Button, SxProps} from '@mui/material'
import collapseIcon from '../../assets/icons/collapse_file_preview.svg'
import expandIcon from '../../assets/icons/expand_file_preview.svg'
import {ToggleFullScreenBtnProps} from './types'
import {useAppSelector} from '../../hooks/useAppDispatch';

export const ToggleFullScreenBtn = ({
                                        styles,
                                    }: ToggleFullScreenBtnProps): JSX.Element => {
    const [fullScreenIcon, setFullScreenIcon] = useState<string>(expandIcon)

    const {theme} = useAppSelector(state => state.theme)
    const themeHex = theme === 'darkTheme' ? '#93dfff' : '#FA4374'
    const defaultStyles: SxProps = {
        color: themeHex,
        borderColor: themeHex,
        margin: 0,
        padding: 0,
        width: '55px',
        height: '55px',
        position: 'absolute',
        top: '25px',
        right: '25px',
    }

    const toggleFullScreen = async () => {
        if (!document.fullscreenElement) {
            await document.documentElement.requestFullscreen()
            return setFullScreenIcon(collapseIcon)
        } else if (document.exitFullscreen) {
            await document.exitFullscreen()
            return setFullScreenIcon(expandIcon)
        }
    }

    return (
        <Button
            variant="outlined"
            size="large"
            sx={styles ?? defaultStyles}
            onClick={toggleFullScreen}>
            <img src={fullScreenIcon} alt="fullScreenIcon"/>
        </Button>
    )
}
