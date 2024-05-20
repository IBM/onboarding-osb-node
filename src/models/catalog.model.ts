import { IsNotEmpty } from 'class-validator'
import { ServiceDefinition } from './service-definition.model'

export class Catalog {
  @IsNotEmpty()
  services: ServiceDefinition[]

  constructor(services: ServiceDefinition[]) {
    this.services = services
  }

  public getServiceDefinitions(): ServiceDefinition[] {
    return this.services
  }

  public toJSON(): string {
    return JSON.stringify({
      serviceDefinitions: this.services,
    })
  }

  public toString(): string {
    return `Catalog{serviceDefinitions=${JSON.stringify(this.services)}}`
  }
}
