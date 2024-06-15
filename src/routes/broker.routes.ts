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

    /**
     * PUT /v2/catalog
     *
     * Route to import a catalog file. This endpoint allows for the uploading of a single file to import the catalog data.
     *
     * @route PUT /v2/catalog
     * @param {Request} req - Express request object, with the uploaded file available at req.file
     * @param {Response} res - Express response object
     * @param {Function} next - Express middleware function for error handling
     *
     * @middleware upload.single('file') - Middleware to handle single file upload
     * @controller importCatalog - Controller method to handle the catalog import logic
     *
     * @throws {Error} If there is an issue with the file upload or catalog import process
     */
    router.put('/v2/catalog', upload.single('file'), controller.importCatalog)

    /**
     * GET /v2/catalog
     *
     * Route to get the catalog, returning services and plans.
     *
     * @route GET /v2/catalog
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @param {Function} next - Express middleware function for error handling
     *
     * @returns {Object} The catalog containing services and plans
     * @throws {Error} If there is an issue retrieving the catalog
     */
    router.get('/v2/catalog', controller.getCatalog)

    /**
     * PUT /v2/service_instances/:instanceId
     * Create service instance.
     * @param {import('express').Request} req - HTTP request
     * @param {import('express').Response} res - HTTP response
     * @param {string} req.params.instanceId - Instance ID
     * @param {boolean} [req.query.accepts_incomplete] - Accepts incomplete
     * @param {object} req.body - Input JSON
     * @returns {Promise<void>}
     * @throws {Error} In case of error
     */
    router.put('/v2/service_instances/:instanceId', controller.provision)

    /**
     * IBM Cloud Enablement Extension: enable service instance
     * @throws IOException
     */
    router.put(
      '/bluemix_v1/service_instances/:instanceId',
      controller.updateState,
    )

    /**
     * IBM Cloud Enablement Extension: service instance state inquiry.
     * @throws IOException
     */
    router.get('/bluemix_v1/service_instances/:instanceId', controller.getState)
    router.put(
      '/v2/service_instances/:instanceId/service_bindings/:bindingId',
      controller.bind,
    )
    router.delete(
      '/v2/service_instances/:instanceId/service_bindings/:bindingId',
      controller.unbind,
    )

    /**
     * Deprovision/Delete given service instance.
     * @param {string} instanceId - The instance id
     * @param {string} plan_id - The plan id
     * @param {string} service_id - The service id
     * @param {boolean} accepts_incomplete - Accepts incomplete
     */
    router.delete('/v2/service_instances/:instanceId', controller.deprovision)
    router.patch('/v2/service_instances/:instanceId', controller.update)
    router.get(
      '/v2/service_instances/:instanceId/last_operation',
      controller.fetchLastOperation,
    )
    router.get('/provision_status', controller.getProvisionStatus)

    return router
  }
}
