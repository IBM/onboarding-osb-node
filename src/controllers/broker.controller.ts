import { Request, Response } from 'express'
import { BrokerService } from '../services/broker.service'
import Logger from '../utils/logger'
import BrokerUtil from '../utils/brokerUtil'

export class BrokerController {
  constructor(private brokerService: BrokerService) {}

  public importCatalog = async (req: Request, res: Response): Promise<void> => {
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
      Logger.error('Error importing catalog:', error)
      res.status(500).json({
        message: 'Internal Server Error while importing catalog.',
      })
    }
  }

  public getCatalog = async (_req: Request, res: Response): Promise<void> => {
    try {
      const response = await this.brokerService.getCatalog()
      Logger.info('Request completed: GET /v2/catalog')
      res.status(200).json(response)
    } catch (error) {
      Logger.error('Error retrieving catalog:', error)
      res.status(500).json({
        message: 'Internal Server Error while retrieving catalog.',
      })
    }
  }

  public provision = async (req: Request, res: Response): Promise<void> => {
    try {
      const instanceId = req.params.instanceId ?? ''
      const acceptsIncomplete = req.query.accepts_incomplete === 'true'

      Logger.info(
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

      Logger.info(
        `Create Service Instance Response status: 201, body: ${JSON.stringify(response)}`,
      )

      res.status(200).json(response)
    } catch (error) {
      Logger.error('Error provisioning service instance:', error)
      res.status(500).json({
        message: 'Internal Server Error while provisioning service instance.',
      })
    }
  }

  public updateState = async (req: Request, res: Response): Promise<void> => {
    try {
      const instanceId = req.params.instanceId

      Logger.info(
        `Update instance state request received: PUT /bluemix_v1/service_instances/${instanceId} request body: ${JSON.stringify(req.body)}`,
      )

      const response = await this.brokerService.updateState(
        instanceId,
        req.body,
        BrokerUtil.getIamId(req) ?? '',
      )

      Logger.info(
        `Update instance state response status: 200, body: ${JSON.stringify(response)}`,
      )

      res.status(200).json(response)
    } catch (error) {
      Logger.error('Error updating service instance:', error)
      res.status(500).json({
        message: 'Internal Server Error while updating service instance.',
      })
    }
  }

  public getState = async (req: Request, res: Response): Promise<void> => {
    try {
      const instanceId = req.params.instanceId

      Logger.info(
        `Get instance state request received: GET /bluemix_v1/service_instances/${instanceId}`,
      )

      const response = await this.brokerService.getState(
        instanceId,
        BrokerUtil.getIamId(req) ?? '',
      )

      Logger.info(
        `Get instance state response status: 200, body: ${JSON.stringify(response)}`,
      )

      res.status(200).json(response)
    } catch (error) {
      Logger.error('Error getting state:', error)
      res.status(500).json({
        message: 'Internal Server Error while retrieving state.',
      })
    }
  }

  public bind = async (req: Request, res: Response): Promise<void> => {
    try {
      const instanceId = req.params.instanceId
      const bindingId = req.params.bindingId

      Logger.info(
        `Bind request received: PUT /v2/service_instances/${instanceId}/service_bindings/${bindingId} request body: ${JSON.stringify(req.body)}`,
      )

      const response = {}

      Logger.info(
        `Bind response status: 201, body: ${JSON.stringify(response)}`,
      )

      res.status(201).json(response)
    } catch (error) {
      Logger.error('Error binding service:', error)
      res.status(500).json({
        message: 'Internal Server Error while binding service.',
      })
    }
  }

  public unbind = async (req: Request, res: Response): Promise<void> => {
    try {
      const instanceId = req.params.instanceId
      const bindingId = req.params.bindingId
      const plan_id = req.query?.plan_id || ''
      const service_id = req.query?.service_id || ''

      Logger.info(
        `Unbind request received: DELETE /v2/service_instances/${instanceId}/service_bindings/${bindingId}?plan_id=${plan_id}&service_id=${service_id}`,
      )

      const response = {}
      Logger.info(
        `Unbind response status: 200, body: ${JSON.stringify(response)}`,
      )

      res.status(200).json(response)
    } catch (error) {
      Logger.error('Error unbinding service:', error)
      res.status(500).json({
        message: 'Internal Server Error while unbinding service.',
      })
    }
  }

  public deprovision = async (req: Request, res: Response): Promise<void> => {
    try {
      const instanceId = req.params.instanceId
      const acceptsIncomplete = req.query.accepts_incomplete === 'true'
      const planId = req.query.plan_id as string
      const serviceId = req.query.service_id as string

      Logger.info(
        `Deprovision Service Instance request received: DELETE /v2/service_instances/${instanceId}?accepts_incomplete=${acceptsIncomplete}&plan_id=${planId}&service_id=${serviceId}`,
      )

      const response = await this.brokerService.deprovision(
        instanceId,
        planId,
        serviceId,
        BrokerUtil.getIamId(req) ?? '',
      )

      Logger.info(
        `Deprovision Service Instance Response status: 200, body: ${JSON.stringify(response)}`,
      )

      res.status(200).json(response)
    } catch (error) {
      Logger.error('Error deprovisioning service instance:', error)
      res.status(500).json({
        message: 'Internal Server Error while deprovisioning service instance.',
      })
    }
  }

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const instanceId = req.params.instanceId
      const acceptsIncomplete = req.query.accepts_incomplete === 'true'

      Logger.info(
        `Update Service Instance request received: PATCH /v2/service_instances/${instanceId}?accepts_incomplete=${acceptsIncomplete} request body: ${JSON.stringify(req.body)}`,
      )

      const response = {}

      Logger.info(
        `Update Service Instance Response status: 200, body: ${JSON.stringify(response)}`,
      )

      res.status(200).json(response)
    } catch (error) {
      Logger.error('Error updating service instance:', error)
      res.status(500).json({
        message: 'Internal Server Error while updating service instance.',
      })
    }
  }

  public fetchLastOperation = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const instanceId = req.params.instanceId
      const operation = req.query.operation as string | undefined
      const planId = req.query.plan_id as string
      const serviceId = req.query.service_id as string

      Logger.info(
        `Get last_operation request received: GET /v2/service_instances/${instanceId}?operation=${operation}&plan_id=${planId}&service_id=${serviceId}`,
      )

      const originatingIdentity = BrokerUtil.getIamId(req) ?? ''

      const response = await this.brokerService.lastOperation(
        instanceId,
        originatingIdentity,
      )

      Logger.info(
        `last_operation Response status: 200, body: ${JSON.stringify(response)}`,
      )

      res.status(200).json(response)
    } catch (error) {
      Logger.error('Error fetching last operation:', error)
      res.status(500).json({
        message: 'Internal Server Error while fetching last operation.',
      })
    }
  }

  public getProvisionStatus = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
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
      Logger.error('Error generating provision status page:', error)
      res
        .status(500)
        .send('Internal Server Error while generating provision status page.')
    }
  }
}
