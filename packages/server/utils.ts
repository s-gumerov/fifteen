import type { TUser } from './store'
import { CLIENT_ROUTES } from './routes/client'

export const getUrlAndRedirect = (
  user: TUser | null,
  originalUrl: CLIENT_ROUTES,
  isPrivateRoute: boolean,
  isPublicRoute: boolean
): { url: CLIENT_ROUTES; isRedirect: boolean } => {
  if (user) {
    if (isPublicRoute) {
      return { url: CLIENT_ROUTES.MAIN, isRedirect: true }
    } else {
      return { url: originalUrl, isRedirect: false }
    }
  } else {
    if (isPrivateRoute) {
      return { url: CLIENT_ROUTES.AUTH, isRedirect: true }
    } else {
      return { url: originalUrl, isRedirect: false }
    }
  }
}
