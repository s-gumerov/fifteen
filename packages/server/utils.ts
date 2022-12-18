import type {TUser} from './store'
import {Theme} from './db';
import {DEFAULT_THEME} from './const';
import {
  CLIENT_ROUTES,
  PRIVATE_CLIENT_ROUTES,
  PUPLIC_CLIENT_ROUTES,
} from './routes/client'

export const getUrlAndRedirect = (
  user: TUser | null,
  originalUrl: CLIENT_ROUTES
): { url: CLIENT_ROUTES; isRedirect: boolean } => {
  const isPrivateRoute = PRIVATE_CLIENT_ROUTES.includes(originalUrl)
  const isPublicRoute = PUPLIC_CLIENT_ROUTES.includes(originalUrl)

  if (user) {
    if (isPublicRoute) {
      return {url: CLIENT_ROUTES.MAIN, isRedirect: true}
    } else {
      return {url: originalUrl, isRedirect: false}
    }
  } else {
    if (isPrivateRoute) {
      return {url: CLIENT_ROUTES.AUTH, isRedirect: true}
    } else {
      return {url: originalUrl, isRedirect: false}
    }
  }
}

export const GET_USER_THEME= async (userId: number) => {
  /**
   * если не найдем пользователя в БД то добавим запись со значением по умолчанию ${DEFAULT_THEME}
   */

  const userTheme = await Theme.findOne(
    {
      where: {
        id: userId
      }
    }
  )

  const newTheme = {
    id: userId,
    theme_name: DEFAULT_THEME,
  }

  if (!userTheme) {
    await Theme.create(newTheme)
    return DEFAULT_THEME
  } else {
    return userTheme.dataValues.theme_name
  }
}
