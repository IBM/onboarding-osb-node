import { IsNotEmpty } from 'class-validator'
export class InstanceDto {
  @IsNotEmpty()
  instanceId: string

  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  planId: string

  @IsNotEmpty()
  status: string

  @IsNotEmpty()
  region: string

  @IsNotEmpty()
  updateDate: Date

  constructor(
    instanceId: string,
    name: string,
    planId: string,
    status: string,
    region: string,
    updateDate: Date,
  ) {
    this.instanceId = instanceId
    this.name = name
    this.planId = planId
    this.status = status
    this.region = region
    this.updateDate = updateDate
  }
}
