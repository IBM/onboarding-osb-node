import { IsNotEmpty } from 'class-validator'
import { BaseModel } from './base.model'
import { DashboardClient } from './dashboard-client.model'
import { Plan } from './plan.model'

export class ServiceDefinition extends BaseModel {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  description: string

  bindable: boolean

  planUpdateable: boolean

  @IsNotEmpty()
  plans: Plan[]

  tags: string[]

  metadata: Record<string, any>

  requires: string[]

  dashboardClient: DashboardClient

  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    name: string,
    description: string,
    bindable: boolean,
    planUpdateable: boolean,
    plans: Plan[],
    tags: string[],
    metadata: Record<string, any>,
    requires: string[],
    dashboardClient: DashboardClient,
  ) {
    super(id, createdAt, updatedAt)
    this.name = name
    this.description = description
    this.bindable = bindable
    this.planUpdateable = planUpdateable
    this.plans = plans
    this.tags = tags
    this.metadata = metadata
    this.requires = requires
    this.dashboardClient = dashboardClient
  }

  toString(): string {
    return `ServiceDefinition{id='${this.id}', createdAt='${this.createdAt}', updatedAt='${this.updatedAt}', name='${this.name}', description='${this.description}', bindable=${this.bindable}, planUpdateable=${this.planUpdateable}, plans=${this.plans}, tags=${this.tags}, metadata=${this.metadata}, requires=${this.requires}, dashboardClient=${this.dashboardClient}}`
  }
}
