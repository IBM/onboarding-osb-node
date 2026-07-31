import { RequestHandler } from "express";
import NotFoundError from "../errors/not-found-error.js";

export const notFoundMiddleware: RequestHandler = (req, res, next) => {
  const error = new NotFoundError(`The requested resource '${req.originalUrl}' was not found.`);
  next(error);
};
