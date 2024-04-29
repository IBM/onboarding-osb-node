import { type NextFunction, type Request, type Response } from 'express'
import { type UsageService } from '../services/usage.service'

export class UsageController {
  constructor(private readonly usageService: UsageService) {}

  public getCatalog = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const catalog = await this.usageService.getCatalog()
      res.json(catalog)
    } catch (error) {
      res.status(500).send('Error retrieving catalog')
    }
  }
}
