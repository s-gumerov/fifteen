import { Link } from 'react-router-dom';
import { ROUTES } from '../../router/types';
import './styles.scss';

export const MainPage = (): JSX.Element => (
  <div className="menu">
    <div className="menu__lines">
      <div className="menu__line">
        <Link to={ROUTES.PROFILE} className="menu__line-link">МОЙ ПРОФИЛЬ</Link>
      </div>
      <div className="menu__line">
        <Link to={ROUTES.GAME_FIELD} className="menu__line-link">СТАРТ</Link>
      </div>
      <div className="menu__line">
        <Link to={ROUTES.RULES} className="menu__line-link">ПРАВИЛА</Link>
      </div>
      <div className="menu__line">
        <Link to={ROUTES.LEADERS} className="menu__line-link">ЛИДЕРЫ</Link>
      </div>
    </div>
    <div className="menu__circle">
      <div className="menu__circle-line"></div>
      <div className="menu__circle-line"></div>
      <div className="menu__circle-line">
        <Link to={ROUTES.AUTH} className="menu__circle-link-user">ПОЛЬЗОВАТЕЛЬ</Link>
      </div>
      <div className="menu__circle-line"></div>
      <div className="menu__circle-line"></div>
      <div className="menu__circle-line"></div>
      <div className="menu__circle-line"></div>
      <div className="menu__circle-line">
        <Link to={ROUTES.FORUM} className="menu__circle-link">ФОРУМ</Link>
      </div>
      <div className="menu__circle-line"></div>
    </div>
  </div>
)