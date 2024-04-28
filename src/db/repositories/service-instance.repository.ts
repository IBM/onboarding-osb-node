import { ServiceInstance } from '../entities/service-instance.entity'

export interface ServiceInstanceRepository {
  getInstancesForUsage(): Promise<ServiceInstance[]>
  findByInstanceIdAndStatusNotIn(
    instanceId: string,
    status: string[]
  ): Promise<ServiceInstance[]>
}
