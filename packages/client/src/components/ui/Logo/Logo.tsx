import React from 'react'
import {Link} from 'react-router-dom'
import {appTitle} from '../../../const'
import {LogoProps} from './types'
import './styles.scss'
import {useAppSelector} from '../../../hooks/useAppDispatch';
import backArrowSvg from '../../../assets/icons/back_arrow.svg'

export const Logo = (props: LogoProps): JSX.Element => {
    const {theme} = useAppSelector(state => state.theme)
    const themeClassName = theme === 'dark' ? 'blueBackgroundTheme' : 'pinkBackgroundTheme'
    const logoBtnBackgroundClassName = theme === 'dark' ? 'logoBtnForDarkTheme' : 'logoBtnForPinkTheme'

    const BackArrowBtn = (): JSX.Element => {
        return (
            props.backUrl ?
                <Link to={props.backUrl} className={`logo__button ${logoBtnBackgroundClassName}`}>
                    <img src={backArrowSvg} alt='backArrowSvg'/>
                </Link>
                : <></>
        )
    }

    return (
        <div className={`logo ${themeClassName}`}>
            <span className="logo__title">{appTitle}</span>
            <BackArrowBtn/>
        </div>
    )
}
