export class Context {
  name: string
  crn: string
  platform: string
  accountId: string
  resourceGroupCrn: string
  targetCrn: string

  constructor(
    name: string,
    crn: string,
    platform: string,
    accountId: string,
    resourceGroupCrn: string,
    targetCrn: string,
  ) {
    this.name = name
    this.crn = crn
    this.platform = platform
    this.accountId = accountId
    this.resourceGroupCrn = resourceGroupCrn
    this.targetCrn = targetCrn
  }
}
