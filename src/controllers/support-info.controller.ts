import { NextFunction, Request, Response } from 'express'
import { SupportInfoService } from '../services/support-info.service'

export class SupportInfoController {
  constructor(private readonly supportInfoService: SupportInfoService) {}

  public getInstances = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const instances = await this.supportInfoService.getServiceInstances()
      res.json(instances)
    } catch (error) {
      res.status(500).send('Error retrieving instances')
    }
  }

  public getMetadata = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const metadata = await this.supportInfoService.getMetadata()
      res.json(metadata)
    } catch (error) {
      res.status(500).send('Error retrieving metadata')
    }
  }
}
