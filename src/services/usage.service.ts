import { MeteringPayload } from '../models/metering-payload.model'

export interface UsageService {
  sendUsageData(
    resourceId: string,
    meteringPayload: MeteringPayload,
  ): Promise<string>
}
