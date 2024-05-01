import { MeteringPayload } from '../models/metering-payload.interface'

export interface UsageService {
  sendUsageData(
    resourceId: string,
    meteringPayload: MeteringPayload,
  ): Promise<string>
}
