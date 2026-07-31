import { RequestHandler } from "express";
import { SupportInfoService } from "../services/support-info.service.js";
import logger from "../utils/logger.js";

export class SupportInfoController {
  constructor(private supportInfoService: SupportInfoService) {}

  public getInstances: RequestHandler = async (_req, res, next) => {
    try {
      const instances = await this.supportInfoService.getServiceInstances();
      res.status(200).json(instances);
    } catch (error) {
      logger.error(`Error retrieving instances: ${error}`);
      next(error);
    }
  };

  public getMetadata: RequestHandler = async (_req, res, next): Promise<void> => {
    try {
      const metadata = await this.supportInfoService.getMetadata();
      res.status(200).json(metadata);
    } catch (error) {
      logger.error(`Error retrieving metadata: ${error}`);
      next(error);
    }
  };
}
