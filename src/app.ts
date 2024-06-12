import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import Logger from './utils/logger'
import { errorHandler } from './middlewares/error-middleware'
import AppDataSource from './db/data-source'
import { AppRoutes } from './routes'
// import { encodedSlashes } from './middlewares/encoded-slashes-middleware';
import { loggerMiddleware } from './middlewares/logger-middleware'
import { notFoundMiddleware } from './middlewares/not-found-middleware'
import { basicAuth } from './middlewares/authorization'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// Use encoded slashes middleware
// app.use(encodedSlashes);

// Use logger middleware
app.use(loggerMiddleware)

// Use basic authentication middleware
app.use(basicAuth)

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Content-Type', 'application/json')
  next()
})

app.get('/liveness', (_req: Request, res: Response) => {
  res.sendStatus(200)
})

app.use(AppRoutes.routes)

// Catch-all for unmatched routes
app.use('*', notFoundMiddleware)

// Error handling should be last
app.use(errorHandler)

const startServer = async () => {
  try {
    await AppDataSource.initialize()
    Logger.info('Data Source has been initialized!')

    const server = app.listen(PORT, () => {
      Logger.info(`Server is running on http://localhost:${PORT}`)
    })

    return server
  } catch (error) {
    Logger.error('Data Source initialization failed:', error)
    process.exit(1)
  }
}

if (require.main === module) {
  startServer()
}

process.on('uncaughtException', error => {
  Logger.error('Uncaught Exception:', error)
  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  Logger.error('Unhandled Rejection at:', promise, 'reason:', reason)
  process.exit(1)
})

export { app, startServer }
