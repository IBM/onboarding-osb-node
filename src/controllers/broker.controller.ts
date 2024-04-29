import { type NextFunction, type Request, type Response } from 'express'
import { type BrokerService } from '../services/broker.service'

export class BrokerController {
  constructor(private readonly brokerService: BrokerService) {}

  public getCatalog = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const catalog = await this.brokerService.getCatalog()
      res.json(catalog)
    } catch (error) {
      res.status(500).send('Error retrieving catalog')
    }
  }
}
