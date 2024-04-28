import { IsNotEmpty, IsUUID } from 'class-validator'

export abstract class BaseDTO {
  @IsUUID()
  @IsNotEmpty()
  id: string

  @IsNotEmpty()
  createdAt: Date

  @IsNotEmpty()
  updatedAt: Date

  constructor(id: string, createdAt: Date, updatedAt: Date) {
    this.id = id
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
