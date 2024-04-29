import { Router } from 'express'
import { BrokerRoutes } from './routes/broker.routes'

export class AppRoutes {
  static get routes(): Router {
    const router = Router()

    router.use('/broker', BrokerRoutes.routes)

    return router
  }
}
