import { NextFunction, Request, Response } from 'express'
import { UsageService } from '../services/usage.service'

export class UsageController {
  constructor(private readonly usageService: UsageService) {}

  public sendUsageData = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const resourceId = req.params.resourceId
    const meteringPayload = req.body

    try {
      const response = await this.usageService.sendUsageData(
        resourceId,
        meteringPayload,
      )
      res.json(response)
    } catch (error) {
      console.error('Error sending usage data:', error)
      res.status(500).send('Error sending usage data')
    }
  }
}
