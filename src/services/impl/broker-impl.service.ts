import fs from "node:fs";
import path from "node:path";
import { promisify } from "util";
import { plainToInstance } from "class-transformer";
import { Repository } from "typeorm";

import { BrokerService } from "../broker.service.js";
import { Catalog } from "../../models/catalog.model.js";
import { CreateServiceInstanceResponse } from "../../models/response/create-service-instance-response.model.js";
import { CreateServiceInstanceRequest } from "../../models/create-service-instance-request.model.js";

import { ServiceDefinition } from "../../models/service-definition.model.js";
import { UpdateStateRequest } from "../../models/update-state-request.model.js";
import { ServiceInstanceStateResponse } from "../../models/response/service-instance-state-response.model.js";
import logger from "../../utils/logger.js";
import { ServiceInstance } from "../../db/entities/service-instance.entity.js";
import BrokerUtil from "../../utils/brokerUtil.js";
import { CatalogUtil } from "../../utils/catalogUtil.js";
import { ServiceInstanceStatus } from "../../enums/service-instance-status.js";
import { OperationState } from "../../enums/operation-state.js";
import AppDataSource from "../../db/data-source.js";

const CATALOG_PATH = path.join(__dirname, "../../assets/data/catalog.json");

export class BrokerServiceImpl implements BrokerService {
  dashboardUrl: string = process.env.DASHBOARD_URL || "http://localhost:8080";
  private catalog: Catalog;
  private static readonly INSTANCE_STATE = "state";
  private static readonly DISPLAY_NAME = "displayName";
  private static readonly PROVISION_STATUS_API = "/provision_status?type=";
  private static readonly INSTANCE_ID = "&instance_id=";

  constructor(
    private readonly serviceInstanceRepo: Repository<ServiceInstance> = AppDataSource.getRepository(
      ServiceInstance,
    ),
  ) {
    this.catalog = BrokerServiceImpl.loadCatalogFromDisk();
  }

  private static loadCatalogFromDisk(): Catalog {
    try {
      const raw = fs.readFileSync(CATALOG_PATH, { encoding: "utf8" });
      const catalogJson = JSON.parse(raw);
      if (!catalogJson.services || !Array.isArray(catalogJson.services)) {
        logger.warn("catalog.json has no services array — starting with empty catalog");
        return new Catalog([]);
      }
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
      );
      logger.info(`Loaded catalog from disk: ${serviceDefinitions.length} service(s)`);
      return new Catalog(serviceDefinitions);
    } catch (err) {
      logger.warn(`Could not load catalog.json from disk, starting with empty catalog: ${err}`);
      return new Catalog([]);
    }
  }

  public async importCatalog(file: Express.Multer.File): Promise<any> {
    try {
      const data = file.buffer
        ? file.buffer.toString("utf8")
        : await promisify(fs.readFile)(file.path, { encoding: "utf8" });
      const catalogJson = JSON.parse(data);

      if (!catalogJson.services || !Array.isArray(catalogJson.services)) {
        throw new Error('Invalid catalog format: "services" array is missing or not an array');
      }

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
      );
      this.catalog = new Catalog(serviceDefinitions);
      logger.info(`Imported catalog: ${JSON.stringify(this.catalog)}`);

      return catalogJson;
    } catch (error) {
      logger.error(`Failed to import catalog: ${error}`);
      throw error;
    }
  }

  public async getCatalog(): Promise<Catalog> {
    return this.catalog;
  }

  public async provision(
    instanceId: string,
    details: any,
    iamId: string,
    region: string,
  ): Promise<CreateServiceInstanceResponse> {
    const createServiceRequest = new CreateServiceInstanceRequest(details);
    createServiceRequest.instanceId = instanceId;

    if (
      createServiceRequest.context &&
      createServiceRequest.context.platform === BrokerUtil.IBM_CLOUD
    ) {
      const plan = CatalogUtil.getPlan(
        this.catalog,
        createServiceRequest.service_id,
        createServiceRequest.plan_id,
      );

      if (!plan) {
        logger.error(
          `Plan id:${createServiceRequest.plan_id} does not belong to this service: ${createServiceRequest.service_id}`,
        );
        throw new Error(`Invalid plan id: ${createServiceRequest.plan_id}`);
      }

      const serviceInstance = this.getServiceInstanceEntity(createServiceRequest, iamId, region);

      await this.serviceInstanceRepo.save(serviceInstance);

      logger.info(
        `Service Instance created: instanceId: ${instanceId} status: ${serviceInstance.status} planId: ${plan.id}`,
      );

      const displayName = this.getServiceMetaDataByAttribute(BrokerServiceImpl.DISPLAY_NAME);
      const responseUrl = `${process.env.DASHBOARD_URL}${BrokerServiceImpl.PROVISION_STATUS_API}${displayName || this.catalog.getServiceDefinitions()[0].name}${BrokerServiceImpl.INSTANCE_ID}${instanceId}`;

      return plainToInstance(CreateServiceInstanceResponse, {
        dashboardUrl: responseUrl,
      });
    } else {
      logger.error(`Unidentified platform: ${createServiceRequest.context?.platform}`);
      throw new Error(`Invalid platform: ${createServiceRequest.context?.platform}`);
    }
  }

  public async deprovision(
    instanceId: string,
    planId: string,
    serviceId: string,
    iamId: string,
  ): Promise<boolean> {
    logger.info(
      `Deprovisioning instance: ${instanceId} planId: ${planId} serviceId: ${serviceId} iamId: ${iamId}`,
    );
    await this.serviceInstanceRepo.delete({ instanceId });
    return true;
  }

  private getServiceMetaDataByAttribute(attribute: string): string | null {
    const service = this.catalog.services[0];

    if (service && service.metadata) {
      if (
        Object.prototype.hasOwnProperty.call(service.metadata, attribute) &&
        service.metadata[attribute]
      ) {
        return service.metadata[attribute].toString();
      }
    }

    return null;
  }

  public async lastOperation(instanceId: string, iamId: string): Promise<any> {
    logger.info(`last_operation Response status: 200, body: ${instanceId} ${iamId}`);

    return {
      [BrokerServiceImpl.INSTANCE_STATE]: OperationState.SUCCEEDED,
    };
  }

  public async updateState(
    instanceId: string,
    json: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    iamId: string,
  ): Promise<any> {
    const updateStateRequest = plainToInstance(UpdateStateRequest, json as Record<string, unknown>);

    const response: ServiceInstanceStateResponse = {
      active: updateStateRequest.enabled || false,
      enabled: updateStateRequest.enabled || false,
    };

    return response;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getState(instanceId: string, iamId: string): Promise<any> {
    const response: ServiceInstanceStateResponse = {
      active: false,
      enabled: false,
    };

    return response;
  }

  private getServiceInstanceEntity(
    request: CreateServiceInstanceRequest,
    iamId: string,
    region: string,
  ): ServiceInstance {
    const instance = new ServiceInstance();
    instance.instanceId = request.instanceId ?? "";
    instance.name = request.context?.name ?? "";
    instance.serviceId = request.service_id;
    instance.planId = request.plan_id;
    instance.iamId = iamId;
    instance.region = region;
    instance.context = JSON.stringify(request.context);
    instance.parameters = JSON.stringify(request.parameters);
    instance.status = ServiceInstanceStatus.ACTIVE;
    instance.enabled = true;
    instance.createDate = new Date();
    instance.updateDate = new Date();

    return instance;
  }
}
