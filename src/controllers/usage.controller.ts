import { RequestHandler } from "express";
import { UsageService } from "../services/usage.service.js";
import logger from "../utils/logger.js";

export class UsageController {
  constructor(private usageService: UsageService) {}

  public sendUsageData: RequestHandler = async (req, res, next): Promise<void> => {
    try {
      const resourceId = req.params.resourceId as string;
      const meteringPayload = req.body;
      const response = await this.usageService.sendUsageData(resourceId, meteringPayload);
      res.status(200).json(response);
    } catch (error) {
      logger.error(`Error sending usage data: ${error}`);
      next(error);
    }
  };
}
