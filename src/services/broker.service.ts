export interface BrokerService {
  // importCatalog(file: Express.Multer.File): Promise<string>
  getCatalog(): Promise<string>
  // provision(instanceId: string, details: any): Promise<string>
  // updateServiceInstance(instanceId: string, updateData: any): Promise<string>
  // getState(instanceId: string): Promise<string>
  // bind(instanceId: string, bindingId: string, bindingData: any): Promise<string>
  // unbind(instanceId: string, bindingId: string): Promise<string>
  // deprovision(instanceId: string): Promise<string>
  // update(instanceId: string, updateData: any): Promise<string>
  // fetchLastOperation(instanceId: string): Promise<string>
}
