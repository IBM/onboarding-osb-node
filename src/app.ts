import 'reflect-metadata'
import express from 'express'
import dotenv from 'dotenv'
import Logger from './utils/logger'
import { errorHandler } from './middlewares/error-middleware'
import AppDataSource from './db/data-source'
import { AppRoutes } from './routes'
import { encodedSlashes } from './middlewares/encoded-slashes-middleware'
import { loggerMiddleware } from './middlewares/logger-middleware'
import { notFoundMiddleware } from './middlewares/not-found-middleware'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// Use encoded slashes middleware
app.use(encodedSlashes)

// Use logger middleware
app.use(loggerMiddleware)

app.get('/liveness', (req, res) => {
  res.sendStatus(200)
})

app.get('/readiness', (req, res) => {
  res.sendStatus(200)
})

const startServer = async () => {
  try {
    await AppDataSource.initialize()
    Logger.info('Data Source has been initialized!')

    // Application routes
    app.use(AppRoutes.routes)

    // Catch-all for unmatched routes
    app.use('*', notFoundMiddleware)

    // Error handling should be last
    app.use(errorHandler)

    app.listen(PORT, () => {
      Logger.info(`Server is running on http://localhost:${PORT}`)
    })
  } catch (error) {
    Logger.error('Data Source initialization failed:', error)
    process.exit(1)
  }
}

startServer()

process.on('uncaughtException', error => {
  Logger.error('Uncaught Exception:', error)
  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  Logger.error('Unhandled Rejection at:', promise, 'reason:', reason)
  process.exit(1)
})
