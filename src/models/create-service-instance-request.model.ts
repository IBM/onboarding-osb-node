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
  service_id: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  plan_id: string

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
}
