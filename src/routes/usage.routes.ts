import { Router } from 'express'
import { UsageController } from '../controllers/usage.controller'
import { UsageServiceImpl } from '../services/impl/usage-impl.service'

const service = new UsageServiceImpl()
const controller = new UsageController(service)

export class UsageRoutes {
  static get routes(): Router {
    const router = Router()

    router.post('/metering/:resourceId/usage', controller.sendUsageData)

    return router
  }
}
