import {Link} from 'react-router-dom';
import {appTitle} from '../../../const';
import {LogoProps} from './types';
import './styles.scss';
import backArrowSvg from '../../../assets/icons/backArrow.svg';

export const Logo = (props: LogoProps): JSX.Element => {
    const buttonBack = props.backUrl
        ? <Link to={props.backUrl} className="logo__button">
            <img
                src={backArrowSvg}
                alt='backArrowSvg'
                className="logo__img"
            />
        </Link>
        : <Link to="#" className="logo__button logo__button_hidden">
            <img
                src={backArrowSvg}
                alt='backArrowSvg'
                className="logo__img"
            />
        </Link>

    return (
        <div className="logo">
            <span className="logo__title">{appTitle}</span>
            {buttonBack}
        </div>
    )
}