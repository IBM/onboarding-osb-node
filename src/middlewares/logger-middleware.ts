import { RequestHandler } from "express";
import logger from "../utils/logger.js";

export const loggerMiddleware: RequestHandler = (req, res, next) => {
  logger.info(`Request received: ${req.method}: ${req.url}`);
  next();
};
