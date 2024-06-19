import BaseError from './base-error'

export default class EndpointError extends BaseError {
  constructor(message: string, code?: string, params?: string[]) {
    super('EndpointError', 500, message, code, params)
  }
}
