import BaseError from "./base-error.js";

export default class BadRequestError extends BaseError {
  constructor(message: string, code?: string, params?: string[]) {
    super("BadRequestError", 400, message, code, params);
  }
}
