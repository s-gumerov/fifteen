import { Link } from 'react-router-dom';
import { appTitle } from '../../../const';
import { LogoProps } from './types';
import './styles.scss';

export const Logo = (props: LogoProps): JSX.Element => (
    <div className="logo">
      <span className="logo__title">{appTitle}</span>
      {props.backUrl && <Link to={props.backUrl} className={props.logoClass}></Link>}
    </div>
  )