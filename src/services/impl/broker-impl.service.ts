import { BrokerService } from '../broker.service'
import fs from 'fs'
import { promisify } from 'util'
import { getRepository, FindOneOptions } from 'typeorm'
import { Catalog } from '../../models/catalog.model'
import { CreateServiceInstanceRequest } from '../../models/create-service-instance-request.model'
import { ServiceDefinition } from '../../models/service-definition.model'
import { UpdateStateRequest } from '../../models/update-state-request.model'
import { ServiceInstanceStateResponse } from '../../models/response/service-instance-state-response.model'
import Logger from '../../utils/logger'
import { ServiceInstance } from '../../db/entities/service-instance.entity'
import BrokerUtil from '../../utils/brokerUtil'
import { CatalogUtil } from '../../utils/catalogUtil'
import { ServiceInstanceStatus } from '../../enums/service-instance-status'
import AppDataSource from '../../db/data-source'

export class BrokerServiceImpl implements BrokerService {
  dashboardUrl: string = process.env.DASHBOARD_URL || 'http://localhost:8080'
  private catalog: Catalog
  private static readonly INSTANCE_STATE = 'state'
  private static readonly DISPLAY_NAME = 'displayName'
  private static readonly PROVISION_STATUS_API = '/provision_status?type='
  private static readonly INSTANCE_ID = '&instance_id='

  async importCatalog(file: Express.Multer.File): Promise<string> {
    const readFile = promisify(fs.readFile)

    try {
      const data = await readFile(file.path, { encoding: 'utf8' })
      const catalogJson = JSON.parse(data)

      const serviceDefinitions = catalogJson.services.map(
        (service: any) =>
          new ServiceDefinition(
            service.id,
            service.name,
            service.description,
            service.plans,
            service.bindable,
            service.plan_updateable,
            service.tags,
            service.metadata,
            service.requires,
            service.dashboard_client,
          ),
      )
      this.catalog = new Catalog(serviceDefinitions)
      Logger.info('Imported catalog: {}', this.catalog)

      return JSON.stringify(catalogJson)
    } catch (error) {
      Logger.error('Failed to import catalog:', error)
      throw new Error('Error processing catalog file')
    }
  }

  async getCatalog(): Promise<string> {
    return JSON.stringify(this.catalog)
  }

  async provision(
    instanceId: string,
    details: any,
    iamId: string,
    region: string,
  ): Promise<string> {
    try {
      const createServiceRequest = new CreateServiceInstanceRequest(details)
      createServiceRequest.instanceId = instanceId

      if (
        createServiceRequest.context &&
        createServiceRequest.context.platform === BrokerUtil.IBM_CLOUD
      ) {
        const plan = CatalogUtil.getPlan(
          this.catalog,
          createServiceRequest.service_id,
          createServiceRequest.plan_id,
        )

        if (!plan) {
          Logger.error(
            `Plan id:${createServiceRequest.plan_id} does not belong to this service: ${createServiceRequest.service_id}`,
          )
          throw new Error(`Invalid plan id: ${createServiceRequest.plan_id}`)
        }

        const serviceInstance = this.getServiceInstanceEntity(
          createServiceRequest,
          iamId,
          region,
        )

        const serviceInstanceRepository =
          AppDataSource.getRepository(ServiceInstance)
        await serviceInstanceRepository.save(serviceInstance)

        Logger.info(
          `Service Instance created: instanceId: ${instanceId} status: ${serviceInstance.status} planId: ${plan.id}`,
        )

        const displayName = this.getServiceMetaDataByAttribute(
          BrokerServiceImpl.DISPLAY_NAME,
        )
        const responseUrl = `${BrokerUtil.DASHBOARD_URL}/provision_status?type=${displayName || this.catalog.getServiceDefinitions()[0].name}&instance_id=${instanceId}`

        const response = {
          dashboard_url: responseUrl,
        }

        return JSON.stringify(response)
      } else {
        Logger.error(
          `Unidentified platform: ${createServiceRequest.context?.platform}`,
        )
        throw new Error(
          `Invalid platform: ${createServiceRequest.context?.platform}`,
        )
      }
    } catch (error) {
      Logger.error('Error provisioning service instance:', error)
      throw new Error('Error provisioning service instance')
    }
  }

  private getServiceMetaDataByAttribute(attribute: string): string | null {
    const service = this.catalog.services[0]

    if (service && service.metadata) {
      if (
        service.metadata.hasOwnProperty(attribute) &&
        service.metadata[attribute]
      ) {
        return service.metadata[attribute].toString()
      }
    }

    return null
  }

  async deprovision(
    instanceId: string,
    planId: string,
    serviceId: string,
    iamId: string,
  ): Promise<string> {
    try {
      const serviceInstanceRepository =
        AppDataSource.getRepository(ServiceInstance)

      await serviceInstanceRepository.delete({ instanceId })

      const response = { description: 'Deprovisioned' }
      return JSON.stringify(response)
    } catch (error) {
      Logger.error('Error deprovisioning service instance:', error)
      throw new Error('Error deprovisioning service instance')
    }
  }

  async update(
    instanceId: string,
    updateData: any,
    iamId: string,
    region: string,
  ): Promise<string> {
    try {
      await getRepository(ServiceInstance).update({ instanceId }, updateData)
      const response = {
        message: 'Service instance updated',
        instanceId: instanceId,
      }
      return JSON.stringify(response)
    } catch (error) {
      Logger.error('Error updating service instance:', error)
      throw new Error('Error updating service instance')
    }
  }

  async lastOperation(instanceId: string, iamId: string): Promise<string> {
    try {
      const operation = await getRepository(ServiceInstance).findOne({
        where: { instanceId },
      } as FindOneOptions<ServiceInstance>)

      if (!operation) {
        throw new Error('Service instance not found')
      }

      const response = { state: 'succeeded' }
      return JSON.stringify(response)
    } catch (error) {
      Logger.error('Error fetching last operation:', error)
      throw new Error('Error fetching last operation')
    }
  }

  async updateState(
    instanceId: string,
    updateData: any,
    iamId: string,
  ): Promise<string> {
    try {
      const updateStateRequest = new UpdateStateRequest(updateData)
      await getRepository(ServiceInstance).update(
        { instanceId },
        { enabled: updateStateRequest.enabled },
      )
      const response = new ServiceInstanceStateResponse({
        active: updateStateRequest.enabled,
        enabled: updateStateRequest.enabled,
      })
      return JSON.stringify(response)
    } catch (error) {
      Logger.error('Error updating instance state:', error)
      throw new Error('Error updating instance state')
    }
  }

  async getState(instanceId: string, iamId: string): Promise<string> {
    try {
      const state = await getRepository(ServiceInstance).findOne({
        where: { instanceId },
      } as FindOneOptions<ServiceInstance>)

      if (!state) {
        throw new Error('Service instance not found')
      }

      const response = new ServiceInstanceStateResponse({
        active: false,
        enabled: false,
      })
      return JSON.stringify(response)
    } catch (error) {
      Logger.error('Error getting instance state:', error)
      throw new Error('Error getting instance state')
    }
  }

  async bind(
    instanceId: string,
    bindingId: string,
    details: any,
  ): Promise<string> {
    try {
      const serviceInstance = await getRepository(ServiceInstance).findOne({
        where: { instanceId },
      } as FindOneOptions<ServiceInstance>)

      if (!serviceInstance) {
        throw new Error('Service instance not found')
      }
      // Perform binding logic here
      const response = {
        message: 'Service instance bound',
        instanceId: instanceId,
        bindingId: bindingId,
      }
      return JSON.stringify(response)
    } catch (error) {
      Logger.error('Error binding service instance:', error)
      throw new Error('Error binding service instance')
    }
  }

  async unbind(
    instanceId: string,
    bindingId: string,
    planId: string,
    serviceId: string,
  ): Promise<string> {
    try {
      const serviceInstance = await getRepository(ServiceInstance).findOne({
        where: { instanceId },
      } as FindOneOptions<ServiceInstance>)

      if (!serviceInstance) {
        throw new Error('Service instance not found')
      }
      // Perform unbinding logic here
      const response = {
        message: 'Service instance unbound',
        instanceId: instanceId,
        bindingId: bindingId,
      }
      return JSON.stringify(response)
    } catch (error) {
      Logger.error('Error unbinding service instance:', error)
      throw new Error('Error unbinding service instance')
    }
  }

  private getServiceInstanceEntity(
    request: CreateServiceInstanceRequest,
    iamId: string,
    region: string,
  ): ServiceInstance {
    const instance = new ServiceInstance()
    instance.instanceId = request.instanceId
    instance.name = request.context?.name
    instance.serviceId = request.service_id
    instance.planId = request.plan_id
    instance.iamId = iamId
    instance.region = region
    instance.context = JSON.stringify(request.context)
    instance.parameters = JSON.stringify(request.parameters)
    instance.status = ServiceInstanceStatus.ACTIVE
    instance.enabled = true
    instance.createDate = new Date()
    instance.updateDate = new Date()

    return instance
  }
}
