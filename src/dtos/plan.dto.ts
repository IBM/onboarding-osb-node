import { IsNotEmpty } from 'class-validator'
import { BaseDTO } from './base.dto'

export class Plan extends BaseDTO {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  description: string

  metadata: Record<string, any>

  free: boolean

  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    name: string,
    description: string,
    metadata: Record<string, any>,
    free: boolean
  ) {
    super(id, createdAt, updatedAt)
    this.name = name
    this.description = description
    this.metadata = metadata
    this.free = free
  }

  toString(): string {
    return `Plan{id='${this.id}', createdAt='${this.createdAt}', updatedAt='${this.updatedAt}', name='${this.name}', description='${this.description}', metadata=${this.metadata}, free=${this.free}}`
  }
}
