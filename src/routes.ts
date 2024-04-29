import { Router } from 'express'
import { BrokerRoutes } from './routes/broker.routes'
import { SupportInfoRoutes } from './routes/support-info.routes'
import { UsageRoutes } from './routes/usage.routes'

export class AppRoutes {
  static get routes(): Router {
    const router = Router()

    router.use('/broker', BrokerRoutes.routes)
    router.use('/support', SupportInfoRoutes.routes)
    router.use('/usage', UsageRoutes.routes)

    return router
  }
}
