import BaseError from "./base-error.js";

export default class ServiceUnavailableError extends BaseError {
  constructor(message: string, code?: string, params?: string[]) {
    super("ServiceUnavailableError", 503, message, code, params);
  }
}
