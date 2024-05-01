import 'reflect-metadata'
import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import Logger from './utils/logger'

import { errorHandler } from './middlewares/errorHandler'
import DataSource from './db/data-source'
import { AppRoutes } from './routes'

dotenv.config()

const app = express()

// Middleware to parse JSON bodies
app.use(express.json())

const { PORT = 3000 } = process.env

// Error handling middleware
app.use(errorHandler)

// Routes
app.use(AppRoutes.routes)

// Catch-all route for unmatched routes
app.get('*', (req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' })
})

// Initialize Data Source and start server
DataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      Logger.info(`Server is running on http://localhost:${PORT}`)
    })
    Logger.info('Data Source has been initialized!')
  })
  .catch(error => console.log(error))
