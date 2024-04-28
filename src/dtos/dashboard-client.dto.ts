import { BaseDTO } from './base.dto'

export class DashboardClient extends BaseDTO {
  readonly secret: string
  readonly redirectUri: string

  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    secret: string,
    redirectUri: string
  ) {
    super(id, createdAt, updatedAt)
    this.secret = secret
    this.redirectUri = redirectUri
  }
}
