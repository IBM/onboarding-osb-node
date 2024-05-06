import NotFoundError from '../errors/not-found-error'
import { Request, Response, NextFunction } from 'express'

export const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const error = new NotFoundError(
    `The requested resource '${req.originalUrl}' was not found.`,
  )
  next(error)
}
