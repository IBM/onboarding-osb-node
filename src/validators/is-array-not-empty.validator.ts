import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator'

export function IsArrayNotEmpty(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isArrayNotEmpty',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any[], args: ValidationArguments) {
          return Array.isArray(value) && value.length > 0
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must not be an empty array`
        },
      },
    })
  }
}
