import { IsNotEmpty } from 'class-validator'
import { MeasuredUsage } from './measured-usage.model'

export class MeteringPayload {
  @IsNotEmpty()
  planId: string

  @IsNotEmpty()
  resourceInstanceId: string

  @IsNotEmpty()
  start: number

  @IsNotEmpty()
  end: number

  @IsNotEmpty()
  region: string

  @IsNotEmpty()
  measuredUsage: MeasuredUsage[]

  constructor(
    planId: string,
    resourceInstanceId: string,
    start: number,
    end: number,
    region: string,
    measuredUsage: MeasuredUsage[],
  ) {
    this.planId = planId
    this.resourceInstanceId = resourceInstanceId
    this.start = start
    this.end = end
    this.region = region
    this.measuredUsage = measuredUsage
  }

  toString(): string {
    return `MeteringPayload{planId='${this.planId}', instanceId='${this.resourceInstanceId}', startTime='${this.start}', endTime=${this.end}, MeasuredUsage=${JSON.stringify(this.measuredUsage)}}`
  }
}
