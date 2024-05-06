import { Request, Response, NextFunction } from 'express'

export const encodedSlashes = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  req.url = decodeURIComponent(req.url)
  next()
}
