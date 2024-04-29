import { BaseModel } from './base.model'

export class DashboardClient extends BaseModel {
  readonly secret: string
  readonly redirectUri: string

  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    secret: string,
    redirectUri: string,
  ) {
    super(id, createdAt, updatedAt)
    this.secret = secret
    this.redirectUri = redirectUri
  }
}
