export class InstanceDto {
  instanceId: string
  name: string
  planId: string
  status: string
  region: string
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
