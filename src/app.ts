import 'reflect-metadata'
import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import Logger from './utils/logger'
import { errorHandler } from './middlewares/errorHandler'
import DataSource from './db/data-source'
import { AppRoutes } from './routes'
import headersString from './utils/headers'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// Logger middleware
app.use((req: Request, _res: Response, next: () => void) => {
  const headers = headersString(req)
  Logger.info(
    `Request received: ${req.method} ${req.url} request headers: ${headers}`,
  )
  next()
})

// Application routes
app.use(AppRoutes.routes)

// Catch-all for unmatched routes
app.all('*', (req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' })
})

// Error handling should be last
app.use(errorHandler)

// Initialize Data Source and start server
DataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      Logger.info(`Server is running on http://localhost:${PORT}`)
    })
    Logger.info('Data Source has been initialized!')
  })
  .catch(error => {
    Logger.error('Data Source initialization failed:', error)
    process.exit(1)
  })

process.on('uncaughtException', error => {
  Logger.error('Uncaught Exception:', error)
  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  Logger.error('Unhandled Rejection at:', promise, 'reason:', reason)
  process.exit(1)
})
