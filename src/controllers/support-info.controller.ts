import { RequestHandler } from 'express'
import { SupportInfoService } from '../services/support-info.service'
import logger from '../utils/logger'

export class SupportInfoController {
  constructor(private supportInfoService: SupportInfoService) {}

  public getInstances: RequestHandler = async (req, res, next) => {
    try {
      logger.info(
        `Request received: GET /support/instances request headers: ${JSON.stringify(req.headers)}`,
      )

      const instances = await this.supportInfoService.getServiceInstances()

      logger.info('Request completed: GET /support/instances')
      res.status(200).json(instances)
    } catch (error) {
      logger.error(`Error retrieving instances: ${error}`)
      next(error)
    }
  }

  public getMetadata: RequestHandler = async (
    req,
    res,
    next,
  ): Promise<void> => {
    try {
      logger.info(
        `Request received: GET /support/metadata request headers: ${JSON.stringify(req.headers)}`,
      )

      const metadata = await this.supportInfoService.getMetadata()

      logger.info('Request completed: GET /support/metadata')
      res.status(200).json(metadata)
    } catch (error) {
      logger.error(`Error retrieving metadata: ${error}`)
      next(error)
    }
  }
}
