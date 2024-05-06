import { Request, Response, NextFunction } from 'express'
import Logger from '../utils/logger'
import headersString from '../utils/headers'

export const loggerMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const headers = headersString(req)
  Logger.info(
    `Request received: ${req.method} ${req.url} request headers: ${headers}`,
  )
  next()
}
