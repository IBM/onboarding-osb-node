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
        res.status(400).send('No file provided')
        return
      }
      const result = await this.brokerService.importCatalog(file)
      res.status(200).send(result)
    } catch (error) {
      Logger.error('Error importing catalog:', error)
      res.status(500).send('Server Error')
    }
  }

  public getCatalog = async (req: Request, res: Response): Promise<void> => {
    try {
      const catalog = await this.brokerService.getCatalog()
      Logger.info('Request completed: GET /v2/catalog')
      res.json(catalog)
    } catch (error) {
      Logger.error('Error retrieving catalog:', error)
      res.status(500).send('Server Error')
    }
  }

  public provision = async (req: Request, res: Response): Promise<void> => {
    try {
      const instanceId = req.params.instanceId
      const acceptsIncomplete = req.query.accepts_incomplete === 'true'

      Logger.info(
        `Create Service Instance request received: PUT /v2/service_instances/${instanceId}  ?accepts_incomplete=${acceptsIncomplete}  request body: ${JSON.stringify(req.body)}`,
      )

      const iamId = BrokerUtil.getIamId(req)
      const bluemixRegion = BrokerUtil.getHeaderValue(
        req,
        BrokerUtil.BLUEMIX_REGION_HEADER,
      )

      const result = await this.brokerService.provision(
        instanceId,
        req.body,
        iamId,
        bluemixRegion,
      )

      Logger.info(
        `Create Service Instance Response status: 201, body: ${JSON.stringify(result)}`,
      )

      res.status(201).json(result)
    } catch (error) {
      Logger.error('Error provisioning service instance:', error)
      res.status(500).send('Server Error')
    }
  }

  public updateServiceInstance = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const instanceId = req.params.instanceId
      const result = await this.brokerService.updateState(
        instanceId,
        req.body,
        req.header('x-broker-api-originating-identity'),
      )
      res.status(200).json(result)
    } catch (error) {
      Logger.error('Error updating service instance:', error)
      res.status(500).send('Server Error')
    }
  }

  public getState = async (req: Request, res: Response): Promise<void> => {
    try {
      const instanceId = req.params.instanceId
      const state = await this.brokerService.getState(
        instanceId,
        req.header('x-broker-api-originating-identity'),
      )
      res.json(state)
    } catch (error) {
      Logger.error('Error getting state:', error)
      res.status(500).send('Server Error')
    }
  }

  public bind = async (req: Request, res: Response): Promise<void> => {
    try {
      const instanceId = req.params.instanceId
      const bindingId = req.params.bindingId
      const result = await this.brokerService.bind(
        instanceId,
        bindingId,
        req.body,
      )
      res.status(201).json(result)
    } catch (error) {
      Logger.error('Error binding service:', error)
      res.status(500).send('Server Error')
    }
  }

  public unbind = async (req: Request, res: Response): Promise<void> => {
    try {
      const instanceId = req.params.instanceId
      const bindingId = req.params.bindingId
      const result = await this.brokerService.unbind(
        instanceId,
        bindingId,
        req.query.plan_id as string,
        req.query.service_id as string,
      )
      res.status(200).json(result)
    } catch (error) {
      Logger.error('Error unbinding service:', error)
      res.status(500).send('Server Error')
    }
  }

  public deprovision = async (req: Request, res: Response): Promise<void> => {
    try {
      const instanceId = req.params.instanceId
      const result = await this.brokerService.deprovision(
        instanceId,
        req.query.plan_id as string,
        req.query.service_id as string,
        req.header('x-broker-api-originating-identity'),
      )
      res.status(200).json(result)
    } catch (error) {
      Logger.error('Error deprovisioning service instance:', error)
      res.status(500).send('Server Error')
    }
  }

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const instanceId = req.params.instanceId
      const result = await this.brokerService.update(
        instanceId,
        req.body,
        req.header('x-broker-api-originating-identity'),
        req.header('x-bluemix-region'),
      )
      res.status(200).json(result)
    } catch (error) {
      Logger.error('Error updating service:', error)
      res.status(500).send('Server Error')
    }
  }

  public fetchLastOperation = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const instanceId = req.params.instanceId
      const result = await this.brokerService.lastOperation(
        instanceId,
        req.header('x-broker-api-originating-identity'),
      )
      res.status(200).json(result)
    } catch (error) {
      Logger.error('Error fetching last operation:', error)
      res.status(500).send('Server Error')
    }
  }
}
