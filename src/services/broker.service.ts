import { Catalog } from '../models/catalog.model'

export interface BrokerService {
  provision(
    instanceId: string,
    details: any,
    iamId: string,
    region: string,
  ): Promise<string>
  deprovision(
    instanceId: string,
    planId: string,
    serviceId: string,
    iamId: string,
  ): Promise<string>
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
