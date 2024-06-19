import { RequestHandler } from 'express'
import { UsageService } from '../services/usage.service'
import logger from '../utils/logger'

export class UsageController {
  constructor(private usageService: UsageService) {}

  public sendUsageData: RequestHandler = async (
    req,
    res,
    next,
  ): Promise<void> => {
    try {
      const resourceId = req.params.resourceId
      const meteringPayload = req.body

      logger.info(
        `Request received: POST /usage request with resourceId: ${resourceId} payload: ${JSON.stringify(meteringPayload)}`,
      )

      const response = await this.usageService.sendUsageData(
        resourceId,
        meteringPayload,
      )
      res.status(200).json(response)
    } catch (error) {
      logger.error(`Error sending usage data: ${error}`)
      next(error)
    }
  }
}
