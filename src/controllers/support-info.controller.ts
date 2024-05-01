import { type NextFunction, type Request, type Response } from 'express'
import { type SupportInfoService } from '../services/support-info.service'

export class SupportInfoController {
  constructor(private readonly supportInfoService: SupportInfoService) {}

  public getCatalog = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const catalog = undefined //await this.supportInfoService.getCatalog()
      res.json(catalog)
    } catch (error) {
      res.status(500).send('Error retrieving catalog')
    }
  }
}
