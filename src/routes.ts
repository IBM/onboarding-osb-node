import { Router } from 'express'
import { BrokerRoutes } from './routes/broker.routes'
import { UsageRoutes } from './routes/usage.routes'

export class AppRoutes {
  static get routes(): Router {
    const router = Router()

    router.use('/', BrokerRoutes.routes)
    // router.use('/', SupportInfoRoutes.routes)
    router.use('/', UsageRoutes.routes)

    return router
  }
}
