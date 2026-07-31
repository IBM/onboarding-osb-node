import BaseError from "./base-error.js";

export default class EndpointError extends BaseError {
  constructor(message: string, code?: string, params?: string[]) {
    super("EndpointError", 500, message, code, params);
  }
}
