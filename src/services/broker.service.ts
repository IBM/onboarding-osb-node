import { Catalog } from '../models/catalog.model'

export interface BrokerService {
  importCatalog(file: Express.Multer.File): Promise<string>
  getCatalog(): Promise<Catalog>
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
  update(
    instanceId: string,
    updateData: any,
    iamId: string,
    region: string,
  ): Promise<string>
  lastOperation(instanceId: string, iamId: string): Promise<string>
  updateState(
    instanceId: string,
    updateData: any,
    iamId: string,
  ): Promise<string>
  getState(instanceId: string, iamId: string): Promise<string>
  bind(instanceId: string, bindingId: string, details: any): Promise<string>
  unbind(
    instanceId: string,
    bindingId: string,
    planId: string,
    serviceId: string,
  ): Promise<string>
}
