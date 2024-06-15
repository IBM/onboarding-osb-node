import { Request, Response } from 'express'
import { SupportInfoService } from '../services/support-info.service'
import Logger from '../utils/logger'

export class SupportInfoController {
  constructor(private supportInfoService: SupportInfoService) {}

  public getInstances = async (req: Request, res: Response): Promise<void> => {
    try {
      Logger.info(
        `Request received: GET /support/instances request headers: ${JSON.stringify(req.headers)}`,
      )

      const instances = await this.supportInfoService.getServiceInstances()

      Logger.info('Request completed: GET /support/instances')
      res.status(200).json(instances)
    } catch (error) {
      Logger.error('Error retrieving instances:', error)
      res
        .status(500)
        .send(
          'Internal Server Error while retrieving instances. Please try again later.',
        )
    }
  }

  public getMetadata = async (req: Request, res: Response): Promise<void> => {
    try {
      Logger.info(
        `Request received: GET /support/metadata request headers: ${JSON.stringify(req.headers)}`,
      )

      const metadata = await this.supportInfoService.getMetadata()

      Logger.info('Request completed: GET /support/metadata')
      res.status(200).json(metadata)
    } catch (error) {
      Logger.error('Error retrieving metadata:', error)
      res
        .status(500)
        .send(
          'Internal Server Error while retrieving metadata. Please try again later.',
        )
    }
  }
}
