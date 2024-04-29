import { Router } from 'express'
import { BrokerController } from '../controllers/broker.controller'
import { BrokerServiceImpl } from '../services/impl/broker-impl.service'

export class BrokerRoutes {
  static get routes(): Router {
    const router = Router()

    const service = new BrokerServiceImpl()
    const controller = new BrokerController(service)

    router.get('/v2/catalog', controller.getCatalog)

    return router
  }
}
