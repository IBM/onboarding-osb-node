import BaseError from './base-error'

export default class NotFoundError extends BaseError {
  constructor(message: string, code?: string, params?: string[]) {
    super('NotFoundError', 404, message, code, params)
  }
}
