import { IsNotEmpty, IsBoolean, IsString, IsOptional } from 'class-validator'
import { Plan } from './plan.model'
import { DashboardClient } from './dashboard-client.model'

export class ServiceDefinition {
  @IsNotEmpty()
  @IsString()
  id: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsOptional()
  @IsBoolean()
  bindable?: boolean

  @IsOptional()
  @IsBoolean()
  planUpdateable?: boolean

  @IsNotEmpty()
  plans: Plan[]

  @IsOptional()
  tags?: string[]

  @IsOptional()
  metadata?: Record<string, any>

  @IsOptional()
  requires?: string[]

  @IsOptional()
  dashboardClient?: DashboardClient

  constructor(
    id: string,
    name: string,
    description: string,
    plans: Plan[],
    bindable?: boolean,
    planUpdateable?: boolean,
    tags?: string[],
    metadata?: Record<string, any>,
    requires?: string[],
    dashboardClient?: DashboardClient,
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.plans = plans
    this.bindable = bindable
    this.planUpdateable = planUpdateable
    this.tags = tags
    this.metadata = metadata
    this.requires = requires
    this.dashboardClient = dashboardClient
  }

  toString(): string {
    return `ServiceDefinition{id='${this.id}', name='${this.name}', description='${this.description}', bindable=${this.bindable}, planUpdateable=${this.planUpdateable}, plans=${JSON.stringify(this.plans)}, tags=${this.tags}, metadata=${this.metadata}, requires=${this.requires}, dashboardClient=${this.dashboardClient}}`
  }
}
