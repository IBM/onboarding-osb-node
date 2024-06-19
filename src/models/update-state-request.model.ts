import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator'
import { Type } from 'class-transformer'

export class UpdateStateRequest {
  @IsNotEmpty()
  @IsBoolean()
  @Type(() => Boolean)
  enabled: boolean

  @IsOptional()
  @IsString()
  @Type(() => String)
  initiatorId?: string

  @IsOptional()
  @IsString()
  @Type(() => String)
  reasonCode?: string

  constructor(details: Partial<UpdateStateRequest>) {
    if (details) {
      Object.assign(this, details)
    }
  }
}
