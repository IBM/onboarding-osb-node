import { SupportInfoService } from '../support-info.service'
import { InstanceDto } from '../../models/instance.dto'
import { ServiceInstance } from '../../db/entities/service-instance.entity'
import { getRepository } from 'typeorm'

export class SupportInfoServiceImpl implements SupportInfoService {
  private serviceInstanceRepository = getRepository(ServiceInstance)

  async getServiceInstances(): Promise<InstanceDto[]> {
    const instances = await this.serviceInstanceRepository.find()
    const instanceDtos: InstanceDto[] = instances.map(ins =>
      this.mapToInstanceDto(ins),
    )

    return instanceDtos
  }

  async getMetadata(): Promise<string> {
    const metadata = {
      BUILD_NUMBER: process.env.APP_BUILD_NUMBER,
      IAM_ENDPOINT: process.env.IAM_ENDPOINT,
      USAGE_ENDPOINT: process.env.USAGE_ENDPOINT,
      BROKER_URL: process.env.BROKER_URL,
      PC_URL: process.env.PARTNER_CENTER_URL,
      IS_METERING_API_KEY_SET: process.env.METERING_API_KEY !== '',
    }
    return JSON.stringify(metadata)
  }

  private mapToInstanceDto(ins: ServiceInstance): InstanceDto {
    return {
      instanceId: ins.instanceId,
      name: ins.name,
      planId: ins.planId,
      status: ins.status,
      region: ins.region,
      updateDate: ins.updateDate,
    }
  }
}
