import type { TUser } from './store'
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
