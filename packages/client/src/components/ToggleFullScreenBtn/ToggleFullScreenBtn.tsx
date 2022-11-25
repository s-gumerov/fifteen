import { useState } from 'react'
import { Button } from '@mui/material'
import { defaultStyles } from './const'
import collapseIcon from '../../assets/icons/collapse_file_preview.svg'
import expandIcon from '../../assets/icons/expand_file_preview.svg'
import { ToggleFullScreenBtnProps } from './types'

export const ToggleFullScreenBtn = ({
  styles,
}: ToggleFullScreenBtnProps): JSX.Element => {
  const [fullScreenIcon, setFullScreenIcon] = useState<string>(expandIcon)

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
      <img src={fullScreenIcon} alt="fullScreenIcon" />
    </Button>
  )
}
