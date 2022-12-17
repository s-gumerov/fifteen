import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../router/types'
import { logoutByThunk } from '../../store/user/userSlice'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import './styles.scss'

export const MainPage = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    await dispatch(logoutByThunk())
    navigate(0)
  }

  return (
    <div className="menu">
      <div className="menu__lines">
        <div className="menu__line">
          <Link to={ROUTES.PROFILE} className="menu__line-link">
            МОЙ ПРОФИЛЬ
          </Link>
        </div>
        <div className="menu__line">
          <Link to={ROUTES.GAME_FIELD} className="menu__line-link">
            СТАРТ
          </Link>
        </div>
        <div className="menu__line">
          <Link to={ROUTES.RULES} className="menu__line-link">
            ПРАВИЛА
          </Link>
        </div>
        <div className="menu__line">
          <Link to={ROUTES.LEADERS} className="menu__line-link">
            ЛИДЕРЫ
          </Link>
        </div>
      </div>
      <div className="menu__circle">
        <div className="menu__circle-line"></div>
        <div className="menu__circle-line"></div>
        <div className="menu__circle-line">
          <Link
            to="#"
            onClick={handleLogout}
            className="menu__circle-link-user">
            ВЫЙТИ
          </Link>
        </div>
        <div className="menu__circle-line"></div>
        <div className="menu__circle-line"></div>
        <div className="menu__circle-line"></div>
        <div className="menu__circle-line"></div>
        <div className="menu__circle-line">
          <Link to={ROUTES.FORUM} className="menu__circle-link">
            ФОРУМ
          </Link>
        </div>
        <div className="menu__circle-line"></div>
      </div>
    </div>
  )
}
