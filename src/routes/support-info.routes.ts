import { Router } from 'express'
import { SupportInfoController } from '../controllers/support-info.controller'
import { SupportInfoServiceImpl } from '../services/impl/support-info-impl.service'

const service = new SupportInfoServiceImpl()
const controller = new SupportInfoController(service)

export class SupportInfoRoutes {
  static get routes(): Router {
    const router = Router()

    router.get('/support/instances', controller.getInstances)
    router.get('/support/metadata', controller.getMetadata)

    return router
  }
}
