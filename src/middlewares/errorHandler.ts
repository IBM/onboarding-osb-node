import { Request, Response, NextFunction } from 'express'
import BaseError from '../errors/base-error'
import Logger from '../utils/logger'

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    return next(err)
  }

  if (err instanceof BaseError) {
    Logger.error(
      `Handled Error - Code: ${err.statusCode}, Message: ${err.message}, Is Operational: ${err.isOperational}`,
      {
        ip: req.ip,
        method: req.method,
        url: req.originalUrl,
      },
    )

    res.status(err.statusCode).json({
      error: {
        status: err.statusCode,
        message: err.message,
        isOperational: err.isOperational,
        ...(err.code && { code: err.code }),
        ...(err.params && { params: err.params }),
      },
    })
  } else {
    Logger.error(`Unhandled Error - Message: ${err.message}`, {
      ip: req.ip,
      method: req.method,
      url: req.originalUrl,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    })

    res.status(500).json({
      error: {
        status: 500,
        message: 'Internal Server Error',
        details:
          process.env.NODE_ENV === 'development'
            ? err.message
            : 'A server error occurred',
      },
    })
  }
}
