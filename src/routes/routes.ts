import { Router } from 'express'
import { BrokerRoutes } from './broker.routes'
import { UsageRoutes } from './usage.routes'
import { SupportInfoRoutes } from './support-info.routes'

export class AppRoutes {
  static get routes(): Router {
    const router = Router()

    router.use('/', BrokerRoutes.routes)
    router.use('/', SupportInfoRoutes.routes)
    router.use('/', UsageRoutes.routes)

    return router
  }
}
