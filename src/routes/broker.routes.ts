import { Router } from 'express'
import multer from 'multer'
import { BrokerController } from '../controllers/broker.controller'
import { BrokerServiceImpl } from '../services/impl/broker-impl.service'

export class BrokerRoutes {
  static get routes(): Router {
    const router = Router()

    const service = new BrokerServiceImpl()
    const controller = new BrokerController(service)
    const upload = multer({ dest: 'uploads/' })

    // router.put('/v2/catalog', upload.single('file'), controller.importCatalog)
    router.get('/v2/catalog', controller.getCatalog)
    //   router.put('/v2/service_instances/:instanceId', controller.provision)
    //   router.put(
    //     '/bluemix_v1/service_instances/:instanceId',
    //     controller.updateServiceInstance,
    //   )
    //   router.get('/bluemix_v1/service_instances/:instanceId', controller.getState)
    //   router.put(
    //     '/v2/service_instances/:instanceId/service_bindings/:bindingId',
    //     controller.bind,
    //   )
    //   router.delete(
    //     '/v2/service_instances/:instanceId/service_bindings/:bindingId',
    //     controller.unbind,
    //   )
    //   router.delete('/v2/service_instances/:instanceId', controller.deprovision)
    //   router.patch('/v2/service_instances/:instanceId', controller.update)
    //   router.get(
    //     '/v2/service_instances/:instanceId/last_operation',
    //     controller.fetchLastOperation,
    //   )

    //   router.get('/provision_status', (req, res) => {
    //     const instanceId = req.query.instance_id
    //     const type = req.query.type
    //     const responseHtml = `
    //   <html>
    //     <style>
    //       body { font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif; padding: 10px; }
    //       .flex-wrapper { display: flex; flex-direction: column; }
    //       .flex-row { display: flex; flex-direction: row; margin-top: 5px; }
    //       .strong-div { min-width: 10%; }
    //       .hr-short { width: 100%; background: lightgrey; }
    //     </style>
    //     <body>
    //       <h4>Deployment Details</h4>
    //       <div class="flex-wrapper">
    //         <div class="flex-row">
    //           <div class="strong-div"><strong>Type:</strong></div>
    //           <div>${type}</div>
    //         </div>
    //         <hr class="hr-short"/>
    //         <div class="flex-row">
    //           <div class="strong-div"><strong>Instance ID:</strong></div>
    //           <div>${instanceId}</div>
    //         </div>
    //       </div>
    //     </body>
    //   </html>
    // `
    //     res.send(responseHtml)
    //   })

    return router
  }
}
