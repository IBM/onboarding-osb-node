import 'dotenv/config'
import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'

import AppDataSource from './db/data-source'
import logger from './utils/logger'

import { errorHandler } from './middlewares/error-middleware'
import { loggerMiddleware } from './middlewares/logger-middleware'
import { notFoundMiddleware } from './middlewares/not-found-middleware'
import { Authenticator } from './middlewares/authorization'

import { AppRoutes } from './routes/routes'

const PORT = process.env.PORT || 3000

process.on('uncaughtException', error => {
  logger.error(`Uncaught Exception: ${error}`)
  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason)
  process.exit(1)
})

logger.info(`App Build Number: ${process.env.APP_BUILD_NUMBER}`)

export const app = express()

app.use(express.json())

// Use logger middleware
app.use(loggerMiddleware)

app.get('/liveness', (_req: Request, res: Response) => {
  res.sendStatus(200)
})
app.get('/readiness', (_req: Request, res: Response) => {
  res.sendStatus(200)
})

export const startServer = async () => {
  try {
    await AppDataSource.initialize()
    logger.info('Data Source has been initialized!')

    const authenticator = await Authenticator.build({
      basicAuthUsername: process.env.BROKER_BASIC_USERNAME as string,
      basicAuthPassword: process.env.BROKER_BASIC_USERNAME as string,
      allowlistedIds: (process.env.BROKER_BEARER_IDENTITIES as string)?.split(
        ',',
      ),
    })

    app.use(authenticator.authorizeRequest)

    app.use(AppRoutes.routes)

    app.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader('Content-Type', 'application/json')
      next()
    })

    // Catch-all for unmatched routes
    app.use('*', notFoundMiddleware)

    // Error handling should be last
    app.use(errorHandler)

    return app.listen(PORT, () => {
      logger.info(`Server is running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error(error)
    logger.error(`Starting application failed: ${error}`)
    process.exit(1)
  }
}

export const serverHandle = startServer()
