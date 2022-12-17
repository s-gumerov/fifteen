import type { NextFunction, Request, Response } from 'express'
import { getUserInfo, TUser } from './store'
import { CLIENT_ROUTES } from './routes/client'
import { getUrlAndRedirect } from './utils'
import { HTTP_STATUS_CODE } from './const'

export interface RequestCustom extends Request {
  calculatedStatus: HTTP_STATUS_CODE.OK | HTTP_STATUS_CODE.UNAUTHORIZED
  userData: TUser | null
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { originalUrl } = req

  const user = req.headers.cookie ? await getUserInfo(req.headers.cookie) : null
  ;(req as RequestCustom).userData = user

  const urlAndRedirect = getUrlAndRedirect(user, originalUrl as CLIENT_ROUTES)
  const status: HTTP_STATUS_CODE = user
    ? HTTP_STATUS_CODE.OK
    : HTTP_STATUS_CODE.UNAUTHORIZED
  ;(req as RequestCustom).calculatedStatus = status

  urlAndRedirect.isRedirect ? res.redirect(urlAndRedirect.url) : next()
}
