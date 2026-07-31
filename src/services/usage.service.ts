import { MeteringPayload } from "../models/metering-payload.model.js";

export interface UsageService {
  sendUsageData(resourceId: string, meteringPayload: MeteringPayload): Promise<string>;
}
