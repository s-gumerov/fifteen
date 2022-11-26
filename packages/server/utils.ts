import type { TUser } from "./types";
import axios from "axios";
import { CLIENT_ROUTES, PRAKTIKUM_API_URL } from "./const";

export const getUserInfo = async (cookie?: string): Promise<TUser | string> => {
  try {
    const result = await axios<TUser>(`${PRAKTIKUM_API_URL}/api/v2/auth/user`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookie
      },
      withCredentials: true,
    })
    return result.data
  } catch (error) {
    return (error as Error).message;
  }
}

export const getUrlAndRedirect = (
  user: TUser | null,
  originalUrl: CLIENT_ROUTES,
  isPrivateRoute: boolean,
  isPublicRoute: boolean
): { url: CLIENT_ROUTES, isRedirect: boolean } => {
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