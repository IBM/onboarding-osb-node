import { NextFunction, Request, Response } from 'express'
import logger from '../utils/logger'

export const basicAuth = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers['authorization']

  if (!auth) {
    logger.warn('Authorization header is missing')
    return res
      .status(401)
      .json({ message: 'Unauthorized: Authorization header is missing' })
  }

  const [basic, userPass] = auth.split(' ')
  if (!basic || !userPass || basic.toLowerCase() !== 'basic') {
    logger.warn('Invalid authorization format')
    return res
      .status(403)
      .json({ message: 'Forbidden: Invalid authorization format' })
  }

  const checkValue = Buffer.from(
    `${process.env.BROKER_USERNAME}:${process.env.BROKER_PASSWORD}`,
  ).toString('base64')

  if (userPass !== checkValue) {
    logger.warn('Invalid username or password')
    return res
      .status(403)
      .json({ message: 'Forbidden: Invalid username or password' })
  }

  logger.info('User authenticated successfully')
  next()
}
