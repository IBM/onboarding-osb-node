import { InstanceDto } from "../models/instance.dto.js";

export interface SupportInfoService {
  getServiceInstances(): Promise<InstanceDto[]>;
  getMetadata(): Promise<any>;
}
