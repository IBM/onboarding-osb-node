import { RequestHandler } from 'express'
import NotFoundError from '../errors/not-found-error'

export const notFoundMiddleware: RequestHandler = (req, res, next) => {
  const error = new NotFoundError(
    `The requested resource '${req.originalUrl}' was not found.`,
  )
  next(error)
}
