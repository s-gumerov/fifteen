import React from 'react'
import {Link} from 'react-router-dom'
import {appTitle} from '../../../const'
import {LogoProps} from './types'
import './styles.scss'
import backArrowSvg from '../../../assets/icons/back_arrow.svg'

export const Logo = (props: LogoProps): JSX.Element => {

    const BackArrowBtn = (): JSX.Element => {
        return (
            props.backUrl ?
                <Link to={props.backUrl} className='logo__button logoBtnTheme'>
                    <img src={backArrowSvg} alt='backArrowSvg'/>
                </Link>
                : <></>
        )
    }

    return (
        <div className='logo background-theme'>
            <span className="logo__title">{appTitle}</span>
            <BackArrowBtn/>
        </div>
    )
}
