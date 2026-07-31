import { Catalog } from "../models/catalog.model.js";
import { CreateServiceInstanceResponse } from "../models/response/create-service-instance-response.model.js";

export interface ProvisionResult {
  response: CreateServiceInstanceResponse;
  /** true when the operation was accepted asynchronously (caller should reply 202) */
  isAsync: boolean;
  /** true when an identical instance already existed (caller should reply 200) */
  alreadyExists: boolean;
}

export interface BrokerService {
  provision(
    instanceId: string,
    details: any,
    iamId: string,
    region: string,
  ): Promise<ProvisionResult>;
  deprovision(
    instanceId: string,
    planId: string,
    serviceId: string,
    iamId: string,
  ): Promise<boolean | null>;
  lastOperation(instanceId: string, iamId: string): Promise<any | null>;
  importCatalog(file: Express.Multer.File): Promise<string>;
  getCatalog(): Promise<Catalog>;
  updateState(instanceId: string, updateData: any, iamId: string): Promise<string>;
  getState(instanceId: string, iamId: string): Promise<string>;
}
