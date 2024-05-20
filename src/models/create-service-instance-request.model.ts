import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsObject,
  IsBoolean,
} from 'class-validator'
import { Type } from 'class-transformer'
import { Context } from './context.model'

export class CreateServiceInstanceRequest {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  serviceId: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  planId: string

  @IsOptional()
  @Type(() => Context)
  context?: Context

  @IsOptional()
  @IsObject()
  @Type(() => Object)
  parameters?: { [key: string]: any }

  @IsOptional()
  @IsString()
  @Type(() => String)
  instanceId?: string

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  asyncAccepted?: boolean

  constructor(details: Partial<CreateServiceInstanceRequest>) {
    if (details) {
      Object.assign(this, details)
    }
  }

  public setServiceId(serviceId: string) {
    this.serviceId = serviceId
  }

  public getServiceId(): string {
    return this.serviceId
  }

  public setPlanId(planId: string) {
    this.planId = planId
  }

  public getPlanId(): string {
    return this.planId
  }

  public setContext(context: Context) {
    this.context = context
  }

  public getContext(): Context {
    return this.context
  }

  public setParameters(parameters: { [key: string]: any }) {
    this.parameters = parameters
  }

  public getParameters(): { [key: string]: any } {
    return this.parameters
  }

  public setInstanceId(instanceId: string) {
    this.instanceId = instanceId
  }

  public getInstanceId(): string {
    return this.instanceId
  }

  public setAsyncAccepted(asyncAccepted: boolean) {
    this.asyncAccepted = asyncAccepted
  }

  public isAsyncAccepted(): boolean {
    return this.asyncAccepted
  }
}
