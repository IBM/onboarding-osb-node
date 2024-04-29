import { IsNotEmpty } from 'class-validator'
import { ServiceDefinition } from './service-definition.model'

export class Catalog {
  @IsNotEmpty()
  services: ServiceDefinition[]

  constructor(services: ServiceDefinition[]) {
    this.services = services
  }

  toString(): string {
    return `Catalog{services=${this.services}}`
  }
}
