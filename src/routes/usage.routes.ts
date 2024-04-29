import { Router } from 'express'
import { UsageController } from '../controllers/usage.controller'
import { UsageServiceImpl } from '../services/impl/usage-impl.service'

export class UsageRoutes {
  static get routes(): Router {
    const router = Router()

    const service = new UsageServiceImpl()
    const controller = new UsageController(service)

    router.get('/v2/catalog', controller.getCatalog)

    return router
  }
}
