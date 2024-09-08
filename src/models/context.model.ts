import { IsNotEmpty, IsString } from 'class-validator'
import { Type } from 'class-transformer'

export class Context {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  account_id!: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  resource_group_crn!: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  target_crn!: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  name!: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  crn!: string

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  platform!: string
}
