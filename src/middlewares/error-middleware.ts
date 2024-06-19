import { ErrorRequestHandler } from 'express'
import BaseError from '../errors/base-error'
import logger from '../utils/logger'

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  if (err instanceof BaseError) {
    logger.error(
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
    logger.error(`Unhandled Error - Message: ${err.message}`, {
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
