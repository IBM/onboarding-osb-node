import { InstanceDto } from '../models/instance.dto'

export interface SupportInfoService {
  getServiceInstances(): Promise<InstanceDto[]>
  getMetadata(): Promise<string>
}
