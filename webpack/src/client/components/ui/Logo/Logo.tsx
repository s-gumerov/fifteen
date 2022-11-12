import { Link } from 'react-router-dom';
import { appTitle } from '../../../const';
import { LogoProps } from './types';
import './styles.scss';

export const Logo = (props: LogoProps): JSX.Element => {
  const buttonBack = props.backUrl
                    ? <Link to={props.backUrl} className="logo__button"></Link>
                    : <Link to="#" className="logo__button logo__button_hidden"></Link>

  return (
    <div className="logo">
      <span className="logo__title">{appTitle}</span>
      {buttonBack}
    </div>
  )
}