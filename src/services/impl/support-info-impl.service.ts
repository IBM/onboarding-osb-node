import { SupportInfoService } from '../support-info.service'
import { InstanceDto } from '../../models/instance.dto'
import { ServiceInstance } from '../../db/entities/service-instance.entity'
import AppDataSource from '../../db/data-source'

export class SupportInfoServiceImpl implements SupportInfoService {
  private serviceInstanceRepository =
    AppDataSource.getRepository(ServiceInstance)

  private static readonly BUILD_NUMBER = 'BUILD_NUMBER'
  private static readonly IAM_ENDPOINT = 'IAM_ENDPOINT'
  private static readonly USAGE_ENDPOINT = 'USAGE_ENDPOINT'
  private static readonly IS_METERING_API_KEY_SET = 'IS_METERING_APIKEY_SET'
  private static readonly BROKER_URL = 'BROKER_URL'
  private static readonly PC_URL = 'PC_URL'

  async getServiceInstances(): Promise<InstanceDto[]> {
    const instances = await this.serviceInstanceRepository.find()
    let instanceDtos: InstanceDto[] = []

    if (instances && instances.length > 0) {
      instanceDtos = instances.map(instance => this.mapToInstanceDto(instance))
    }

    return instanceDtos
  }

  async getMetadata(): Promise<any> {
    const metadata = {
      [SupportInfoServiceImpl.BUILD_NUMBER]: process.env.APP_BUILD_NUMBER,
      [SupportInfoServiceImpl.IAM_ENDPOINT]: process.env.IAM_ENDPOINT,
      [SupportInfoServiceImpl.USAGE_ENDPOINT]: process.env.USAGE_ENDPOINT,
      [SupportInfoServiceImpl.BROKER_URL]: process.env.BROKER_URL,
      [SupportInfoServiceImpl.PC_URL]: process.env.PC_URL,
      [SupportInfoServiceImpl.IS_METERING_API_KEY_SET]:
        process.env.METERING_API_KEY !== '',
    }

    return metadata
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
