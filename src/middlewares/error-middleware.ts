import { ErrorRequestHandler } from "express";
import BaseError from "../errors/base-error.js";
import logger from "../utils/logger.js";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof BaseError) {
    logger.error(
      `Handled Error - Code: ${err.statusCode}, Message: ${err.message}, Is Operational: ${err.isOperational}`,
      {
        ip: req.ip,
        method: req.method,
        url: req.originalUrl,
      },
    );

    // OSB v2.12 §3: error body must use top-level "description" for the human-readable
    // message and an optional top-level "error" string for the machine-readable code.
    res.status(err.statusCode).json({
      description: err.message,
      ...(err.code && { error: err.code }),
    });
  } else {
    logger.error(`Unhandled Error - Message: ${err.message}`, {
      ip: req.ip,
      method: req.method,
      url: req.originalUrl,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });

    res.status(500).json({
      description: "Internal Server Error",
    });
  }
};
