import { RequestHandler } from 'express'
import { BrokerService } from '../services/broker.service'
import logger from '../utils/logger'
import BrokerUtil from '../utils/brokerUtil'

export class BrokerController {
  constructor(private brokerService: BrokerService) {}

  public importCatalog: RequestHandler = async (req, res, next) => {
    try {
      const file = req.file
      if (!file) {
        res
          .status(400)
          .json({ message: 'No file provided. Please upload a catalog file.' })
        return
      }
      const response = await this.brokerService.importCatalog(file)
      res.status(200).json(response)
    } catch (error) {
      logger.error(`Error importing catalog: ${error}`)
      next(error)
    }
  }

  public getCatalog: RequestHandler = async (_req, res, next) => {
    try {
      const response = await this.brokerService.getCatalog()
      logger.info('Request completed: GET /v2/catalog')
      res.status(200).json(response)
    } catch (error) {
      logger.error(`Error retrieving catalog: ${error}`)
      next(error)
    }
  }

  public provision: RequestHandler = async (req, res, next) => {
    try {
      const instanceId = req.params.instanceId ?? ''
      const acceptsIncomplete = req.query.accepts_incomplete === 'true'

      logger.info(
        `Create Service Instance request received: PUT /v2/service_instances/${instanceId}?accepts_incomplete=${acceptsIncomplete} request body: ${JSON.stringify(req.body)}`,
      )

      const iamId = BrokerUtil.getIamId(req) ?? ''
      const bluemixRegion =
        BrokerUtil.getHeaderValue(req, BrokerUtil.BLUEMIX_REGION_HEADER) ?? ''

      if (!instanceId || !iamId || !bluemixRegion) {
        throw new Error(
          'One or more required parameters are missing or invalid.',
        )
      }

      const response = await this.brokerService.provision(
        instanceId,
        req.body,
        iamId,
        bluemixRegion,
      )

      logger.info(
        `Create Service Instance Response status: 201, body: ${JSON.stringify(response)}`,
      )

      res.status(200).json(response)
    } catch (error) {
      logger.error(`Error provisioning service instance: ${error}`)
      next(error)
    }
  }

  public updateState: RequestHandler = async (req, res, next) => {
    try {
      const instanceId = req.params.instanceId

      logger.info(
        `Update instance state request received: PUT /bluemix_v1/service_instances/${instanceId} request body: ${JSON.stringify(req.body)}`,
      )

      const response = await this.brokerService.updateState(
        instanceId,
        req.body,
        BrokerUtil.getIamId(req) ?? '',
      )

      logger.info(
        `Update instance state response status: 200, body: ${JSON.stringify(response)}`,
      )

      res.status(200).json(response)
    } catch (error) {
      logger.error('Error updating service instance:', error)
      next(error)
    }
  }

  public getState: RequestHandler = async (req, res, next) => {
    try {
      const instanceId = req.params.instanceId

      logger.info(
        `Get instance state request received: GET /bluemix_v1/service_instances/${instanceId}`,
      )

      const response = await this.brokerService.getState(
        instanceId,
        BrokerUtil.getIamId(req) ?? '',
      )

      logger.info(
        `Get instance state response status: 200, body: ${JSON.stringify(response)}`,
      )

      res.status(200).json(response)
    } catch (error) {
      logger.error(`Error getting state: ${error}`)
      next(error)
    }
  }

  public bind: RequestHandler = async (req, res, next) => {
    try {
      const instanceId = req.params.instanceId
      const bindingId = req.params.bindingId

      logger.info(
        `Bind request received: PUT /v2/service_instances/${instanceId}/service_bindings/${bindingId} request body: ${JSON.stringify(req.body)}`,
      )

      const response = {}

      logger.info(
        `Bind response status: 201, body: ${JSON.stringify(response)}`,
      )

      res.status(201).json(response)
    } catch (error) {
      logger.error(`Error binding service: ${error}`)
      next(error)
    }
  }

  public unbind: RequestHandler = async (req, res, next) => {
    try {
      const instanceId = req.params.instanceId
      const bindingId = req.params.bindingId
      const plan_id = req.query?.plan_id || ''
      const service_id = req.query?.service_id || ''

      logger.info(
        `Unbind request received: DELETE /v2/service_instances/${instanceId}/service_bindings/${bindingId}?plan_id=${plan_id}&service_id=${service_id}`,
      )

      const response = {}
      logger.info(
        `Unbind response status: 200, body: ${JSON.stringify(response)}`,
      )

      res.status(200).json(response)
    } catch (error) {
      logger.error(`Error unbinding service: ${error}`)
      next(error)
    }
  }

  public deprovision: RequestHandler = async (req, res, next) => {
    try {
      const instanceId = req.params.instanceId
      const acceptsIncomplete = req.query.accepts_incomplete === 'true'
      const planId = req.query.plan_id as string
      const serviceId = req.query.service_id as string

      logger.info(
        `Deprovision Service Instance request received: DELETE /v2/service_instances/${instanceId}?accepts_incomplete=${acceptsIncomplete}&plan_id=${planId}&service_id=${serviceId}`,
      )

      const response = await this.brokerService.deprovision(
        instanceId,
        planId,
        serviceId,
        BrokerUtil.getIamId(req) ?? '',
      )

      logger.info(
        `Deprovision Service Instance Response status: 200, body: ${JSON.stringify(response)}`,
      )

      res.status(200).json(response)
    } catch (error) {
      logger.error(`Error deprovisioning service instance: ${error}`)
      next(error)
    }
  }

  public update: RequestHandler = async (req, res, next) => {
    try {
      const instanceId = req.params.instanceId
      const acceptsIncomplete = req.query.accepts_incomplete === 'true'

      logger.info(
        `Update Service Instance request received: PATCH /v2/service_instances/${instanceId}?accepts_incomplete=${acceptsIncomplete} request body: ${JSON.stringify(req.body)}`,
      )

      const response = {}

      logger.info(
        `Update Service Instance Response status: 200, body: ${JSON.stringify(response)}`,
      )

      res.status(200).json(response)
    } catch (error) {
      logger.error(`Error updating service instance: ${error}`)
      next(error)
    }
  }

  public fetchLastOperation: RequestHandler = async (req, res, next) => {
    try {
      const instanceId = req.params.instanceId
      const operation = req.query.operation as string | undefined
      const planId = req.query.plan_id as string
      const serviceId = req.query.service_id as string

      logger.info(
        `Get last_operation request received: GET /v2/service_instances/${instanceId}?operation=${operation}&plan_id=${planId}&service_id=${serviceId}`,
      )

      const originatingIdentity = BrokerUtil.getIamId(req) ?? ''

      const response = await this.brokerService.lastOperation(
        instanceId,
        originatingIdentity,
      )

      logger.info(
        `last_operation Response status: 200, body: ${JSON.stringify(response)}`,
      )

      res.status(200).json(response)
    } catch (error) {
      logger.error(`Error fetching last operation: ${error}`)
      next(error)
    }
  }

  public getProvisionStatus: RequestHandler = async (req, res, next) => {
    try {
      const instance_id = req.query.instance_id as string
      const type = req.query.type as string

      const homepage = `
        <html>
          <style>
            body {
              font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
              padding: 10px;
            }
            .flex-wrapper {
              display: flex;
              flex-direction: column;
            }
            .flex-row {
              display: flex;
              flex-direction: row;
              margin-top: 5px;
            }
            .strong-div {
              min-width: 10%;
            }
            .hr-short {
              width: 100%;
              background: lightgrey;
            }
          </style>
          <body>
            <h4>Deployment Details</h4>
            <div class="flex-wrapper">
              <div class="flex-row">
                <div class="strong-div"><strong>Type</strong></div>
                <div>${type}</div>
              </div>
              <hr class="hr-short"/>
              <div class="flex-row">
                <div class="strong-div"><strong>Instance ID</strong></div>
                <div>${instance_id}</div>
              </div>
            </div>
          </body>
        </html>
      `

      res.status(200).send(homepage)
    } catch (error) {
      logger.error(`Error generating provision status page: ${error}`)
      next(error)
    }
  }
}
