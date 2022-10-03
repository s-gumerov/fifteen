import { Link } from 'react-router-dom';
import { ROUTES } from '../../../router/types';
import { appTitle } from '../../../const';
import './styles.scss';

export const Logo = (props: {logoClass: string}): JSX.Element => (
    <div className="logo">
      <span className="logo__title">{appTitle}</span>
      <Link to={ROUTES.MAIN} className={props.logoClass}></Link>
    </div>
  )