import BaseError from "./base-error.js";

export default class InternalServerError extends BaseError {
  constructor(message: string, code?: string, params?: string[]) {
    super("InternalServerError", 500, message, code, params);
  }
}
