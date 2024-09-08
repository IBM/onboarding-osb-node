import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsObject,
} from 'class-validator'
import { Expose } from 'class-transformer'

export class CreateServiceInstanceResponse {
  @IsString()
  @Expose({ name: 'dashboard_url' })
  dashboardUrl!: string

  @IsOptional()
  @IsString()
  operation?: string

  @IsOptional()
  @IsNumber()
  poll_after?: number

  @IsOptional()
  @IsBoolean()
  cancelable?: boolean

  @IsOptional()
  @IsBoolean()
  poll?: boolean

  @IsOptional()
  @IsObject()
  extensions?: Record<string, unknown>

  constructor(data: CreateServiceInstanceResponse) {
    if (data) {
      Object.assign(this, data)
    }
  }
}
