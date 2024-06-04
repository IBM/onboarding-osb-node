import { BrokerService } from '../broker.service'
import fs from 'fs'
import { promisify } from 'util'
import { Catalog } from '../../models/catalog.model'
import { CreateServiceInstanceRequest } from '../../models/create-service-instance-request.model'
import { ServiceDefinition } from '../../models/service-definition.model'
import { UpdateStateRequest } from '../../models/update-state-request.model'
import { ServiceInstanceStateResponse } from '../../models/response/service-instance-state-response.model'
import Logger from '../../utils/logger'
import { getRepository, FindOneOptions } from 'typeorm'
import { ServiceInstance } from '../../db/entities/service-instance.entity'

export class BrokerServiceImpl implements BrokerService {
  dashboardUrl: string = process.env.DASHBOARD_URL || 'http://localhost:8080'
  private catalog: Catalog

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

      const plan = this.catalog
        .getServiceDefinitions()[0]
        .plans.find(p => p.id === createServiceRequest.planId)
      if (!plan) {
        Logger.error(
          `Plan id:${createServiceRequest.planId} does not belong to this service: ${createServiceRequest.serviceId}`,
        )
        throw new Error(`Invalid plan id: ${createServiceRequest.planId}`)
      }

      const serviceInstance = this.getServiceInstanceEntity(
        createServiceRequest,
        iamId,
        region,
      )
      await getRepository(ServiceInstance).save(serviceInstance)

      const response = {
        dashboard_url: `${this.dashboardUrl}/provision_status?type=${this.catalog.getServiceDefinitions()[0].name}&instance_id=${instanceId}`,
      }

      return JSON.stringify(response)
    } catch (error) {
      Logger.error('Error provisioning service instance:', error)
      throw new Error('Error provisioning service instance')
    }
  }

  async deprovision(
    instanceId: string,
    planId: string,
    serviceId: string,
    iamId: string,
  ): Promise<string> {
    try {
      await getRepository(ServiceInstance).delete({ instanceId })
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
    instance.serviceId = request.serviceId
    instance.planId = request.planId
    instance.iamId = iamId
    instance.region = region
    instance.context = JSON.stringify(request.context)
    instance.parameters = JSON.stringify(request.parameters)
    instance.status = 'ACTIVE'
    instance.enabled = true
    instance.createDate = new Date()
    instance.updateDate = new Date()

    return instance
  }
}
