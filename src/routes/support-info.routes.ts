import { Router } from 'express'
import { SupportInfoController } from '../controllers/support-info.controller'
import { SupportInfoServiceImpl } from '../services/impl/support-info-impl.service'

export class SupportInfoRoutes {
  static get routes(): Router {
    const router = Router()

    const service = new SupportInfoServiceImpl()
    const controller = new SupportInfoController(service)

    router.get('/v2/catalog', controller.getCatalog)

    return router
  }
}
