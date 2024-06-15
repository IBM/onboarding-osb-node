import { Request, Response } from 'express'
import { UsageService } from '../services/usage.service'
import Logger from '../utils/logger'

export class UsageController {
  constructor(private usageService: UsageService) {}

  public sendUsageData = async (req: Request, res: Response): Promise<void> => {
    try {
      const resourceId = req.params.resourceId
      const meteringPayload = req.body

      Logger.info(
        `Request received: POST /usage request with resourceId: ${resourceId} payload: ${JSON.stringify(meteringPayload)}`,
      )

      const response = await this.usageService.sendUsageData(
        resourceId,
        meteringPayload,
      )
      res.status(200).json(response)
    } catch (error) {
      Logger.error('Error sending usage data:', error)
      res
        .status(500)
        .send(
          'Internal Server Error while sending usage data. Please try again later.',
        )
    }
  }
}
