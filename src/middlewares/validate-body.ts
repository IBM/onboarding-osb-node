import { ClassConstructor, plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { RequestHandler } from 'express'
import BadRequestError from '../errors/bad-request-error'

/**
 * Returns a middleware that deserialises req.body into the given class,
 * runs class-validator, and calls next(BadRequestError) on failure.
 * On success, req.body is replaced with the typed instance.
 */
export function validateBody<T extends object>(
  cls: ClassConstructor<T>,
): RequestHandler {
  return async (req, _res, next) => {
    const instance = plainToInstance(cls, req.body as Record<string, unknown>)
    const errors = await validate(instance, {
      whitelist: true,
      forbidNonWhitelisted: false,
      skipMissingProperties: false,
    })

    if (errors.length > 0) {
      const messages = errors
        .map(e => Object.values(e.constraints ?? {}).join(', '))
        .join('; ')
      return next(new BadRequestError(`Validation failed: ${messages}`))
    }

    req.body = instance
    next()
  }
}
