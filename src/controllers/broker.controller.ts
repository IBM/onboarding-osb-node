import { Request, Response, NextFunction } from 'express'
import { BrokerService } from '../services/broker.service'
import { Catalog } from '../models/catalog.model'

export class BrokerController {
  constructor(private brokerService: BrokerService) {}

  public importCatalog = async (req: Request, res: Response): Promise<void> => {
    try {
      const file = req.file // Assuming multer is configured to handle 'file' field
      if (!file) {
        return res.status(400).send('No file provided')
      }
      const result = await this.brokerService.importCatalog(file)
      res.status(200).send(result)
    } catch (error) {
      console.error('Error importing catalog:', error)
      res.status(500).send('Server Error')
    }
  }

  public getCatalog = async (req: Request, res: Response): Promise<void> => {
    try {
      const catalog = await this.brokerService.getCatalog()
      res.json(catalog)
    } catch (error) {
      console.error('Error retrieving catalog:', error)
      res.status(500).send('Server Error')
    }
  }

  public provision = async (req: Request, res: Response): Promise<void> => {
    try {
      const instanceId = req.params.instanceId
      const result = await this.brokerService.provision(instanceId, req.body)
      res.status(201).json(result)
    } catch (error) {
      console.error('Error provisioning service instance:', error)
      res.status(500).send('Server Error')
    }
  }

  public updateServiceInstance = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const instanceId = req.params.instanceId
      const result = await this.brokerService.updateServiceInstance(
        instanceId,
        req.body,
      )
      res.status(200).json(result)
    } catch (error) {
      console.error('Error updating service instance:', error)
      res.status(500).send('Server Error')
    }
  }

  public getState = async (req: Request, res: Response): Promise<void> => {
    try {
      const instanceId = req.params.instanceId
      const state = await this.brokerService.getState(instanceId)
      res.json(state)
    } catch (error) {
      console.error('Error getting state:', error)
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
      console.error('Error binding service:', error)
      res.status(500).send('Server Error')
    }
  }

  public unbind = async (req: Request, res: Response): Promise<void> => {
    try {
      const instanceId = req.params.instanceId
      const bindingId = req.params.bindingId
      const result = await this.brokerService.unbind(instanceId, bindingId)
      res.status(200).json(result)
    } catch (error) {
      console.error('Error unbinding service:', error)
      res.status(500).send('Server Error')
    }
  }

  public deprovision = async (req: Request, res: Response): Promise<void> => {
    try {
      const instanceId = req.params.instanceId
      const result = await this.brokerService.deprovision(instanceId)
      res.status(200).json(result)
    } catch (error) {
      console.error('Error deprovisioning service:', error)
      res.status(500).send('Server Error')
    }
  }

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const instanceId = req.params.instanceId
      const result = await this.brokerService.update(instanceId, req.body)
      res.status(200).json(result)
    } catch (error) {
      console.error('Error updating service:', error)
      res.status(500).send('Server Error')
    }
  }

  public fetchLastOperation = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const instanceId = req.params.instanceId
      const result = await this.brokerService.fetchLastOperation(instanceId)
      res.status(200).json(result)
    } catch (error) {
      console.error('Error fetching last operation:', error)
      res.status(500).send('Server Error')
    }
  }
}
