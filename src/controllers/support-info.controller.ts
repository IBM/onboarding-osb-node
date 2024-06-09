import { NextFunction, Request, Response } from 'express'
import { SupportInfoService } from '../services/support-info.service'
import Logger from '../utils/logger'

export class SupportInfoController {
  constructor(private readonly supportInfoService: SupportInfoService) {}

  public getInstances = async (
    _req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<void> => {
    try {
      const instances = await this.supportInfoService.getServiceInstances()
      res.status(200).json(instances)
    } catch (error) {
      Logger.error('Error retrieving service instances:', error)
      res
        .status(500)
        .send(
          'Internal Server Error while retrieving instances. Please try again later.',
        )
    }
  }

  public getMetadata = async (
    _req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<void> => {
    try {
      const metadata = await this.supportInfoService.getMetadata()
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
