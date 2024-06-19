// base-error.ts
export default class BaseError extends Error {
  statusCode: number
  isOperational: boolean
  code?: string
  params?: string[]

  constructor(
    name: string,
    statusCode: number,
    message: string,
    code?: string,
    params?: string[],
  ) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = name
    this.statusCode = statusCode
    this.isOperational = true
    this.code = code
    this.params = params
    Error.captureStackTrace(this, this.constructor)
  }
}
