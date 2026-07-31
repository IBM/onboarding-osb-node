import { RequestHandler } from "express";
import { randomUUID } from "crypto";
import logger from "../utils/logger.js";

export const loggerMiddleware: RequestHandler = (req, res, next) => {
  req.transactionId = randomUUID();

  logger.info({
    message: "Request received",
    method: req.method,
    path: req.path,
    transactionId: req.transactionId,
  });

  res.on("finish", () => {
    logger.info({
      message: "Request completed",
      method: req.method,
      path: req.path,
      transactionId: req.transactionId,
      status: res.statusCode,
    });
  });

  next();
};
