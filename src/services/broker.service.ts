import { Catalog } from '../models/catalog.model'
import { CreateServiceInstanceResponse } from '../models/response/create-service-instance-response.model'

export interface BrokerService {
  provision(
    instanceId: string,
    details: any,
    iamId: string,
    region: string,
  ): Promise<CreateServiceInstanceResponse>
  deprovision(
    instanceId: string,
    planId: string,
    serviceId: string,
    iamId: string,
  ): Promise<boolean>
  lastOperation(instanceId: string, iamId: string): Promise<string>
  importCatalog(file: Express.Multer.File): Promise<string>
  getCatalog(): Promise<Catalog>
  updateState(
    instanceId: string,
    updateData: any,
    iamId: string,
  ): Promise<string>
  getState(instanceId: string, iamId: string): Promise<string>
}
