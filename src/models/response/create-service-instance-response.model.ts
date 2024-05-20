import { IsString, IsOptional } from 'class-validator'
import { Expose } from 'class-transformer'

export class CreateServiceInstanceResponse {
  @IsOptional()
  @IsString()
  @Expose({ name: 'dashboard_url' })
  dashboardUrl?: string

  @IsOptional()
  @IsString()
  operation?: string

  constructor(data: Partial<CreateServiceInstanceResponse>) {
    if (data) {
      Object.assign(this, data)
    }
  }
}
