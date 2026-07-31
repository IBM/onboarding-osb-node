import { RequestHandler } from "express";
import { BrokerService } from "../services/broker.service.js";
import logger from "../utils/logger.js";
import BrokerUtil from "../utils/brokerUtil.js";

export class BrokerController {
  constructor(private brokerService: BrokerService) {}

  public importCatalog: RequestHandler = async (req, res, next) => {
    try {
      const file = req.file;
      if (!file) {
        res.status(400).json({ message: "No file provided. Please upload a catalog file." });
        return;
      }
      const response = await this.brokerService.importCatalog(file);
      res.status(200).json(response);
    } catch (error) {
      logger.error(`Error importing catalog: ${error}`);
      next(error);
    }
  };

  public getCatalog: RequestHandler = async (_req, res, next) => {
    try {
      const response = await this.brokerService.getCatalog();
      res.status(200).json(response);
    } catch (error) {
      logger.error(`Error retrieving catalog: ${error}`);
      next(error);
    }
  };

  public provision: RequestHandler = async (req, res, next) => {
    try {
      const instanceId = (req.params.instanceId as string) ?? "";
      const acceptsIncomplete = req.query.accepts_incomplete === "true";

      const iamId = BrokerUtil.getIamId(req) ?? "";
      const bluemixRegion = BrokerUtil.getHeaderValue(req, BrokerUtil.BLUEMIX_REGION_HEADER) ?? "";

      if (!instanceId || !iamId || !bluemixRegion) {
        throw new Error("One or more required parameters are missing or invalid.");
      }

      const response = await this.brokerService.provision(
        instanceId,
        req.body,
        iamId,
        bluemixRegion,
      );

      res.status(201).json(response);
    } catch (error) {
      logger.error(`Error provisioning service instance: ${error}`);
      next(error);
    }
  };

  public updateState: RequestHandler = async (req, res, next) => {
    try {
      const instanceId = req.params.instanceId as string;

      const response = await this.brokerService.updateState(
        instanceId,
        req.body,
        BrokerUtil.getIamId(req) ?? "",
      );

      res.status(200).json(response);
    } catch (error) {
      logger.error(`Error updating service instance: ${error}`);
      next(error);
    }
  };

  public getState: RequestHandler = async (req, res, next) => {
    try {
      const instanceId = req.params.instanceId as string;

      const response = await this.brokerService.getState(
        instanceId,
        BrokerUtil.getIamId(req) ?? "",
      );

      res.status(200).json(response);
    } catch (error) {
      logger.error(`Error getting state: ${error}`);
      next(error);
    }
  };

  public bind: RequestHandler = async (req, res, next) => {
    try {
      const response = {};
      res.status(201).json(response);
    } catch (error) {
      logger.error(`Error binding service: ${error}`);
      next(error);
    }
  };

  public unbind: RequestHandler = async (req, res, next) => {
    try {
      const response = {};
      res.status(200).json(response);
    } catch (error) {
      logger.error(`Error unbinding service: ${error}`);
      next(error);
    }
  };

  public deprovision: RequestHandler = async (req, res, next) => {
    try {
      const instanceId = req.params.instanceId as string;
      const acceptsIncomplete = req.query.accepts_incomplete === "true";
      const planId = req.query.plan_id as string;
      const serviceId = req.query.service_id as string;

      await this.brokerService.deprovision(
        instanceId,
        planId,
        serviceId,
        BrokerUtil.getIamId(req) ?? "",
      );

      res.sendStatus(acceptsIncomplete ? 202 : 200);
    } catch (error) {
      logger.error(`Error deprovisioning service instance: ${error}`);
      next(error);
    }
  };

  public update: RequestHandler = async (req, res, next) => {
    try {
      const response = {};
      res.status(200).json(response);
    } catch (error) {
      logger.error(`Error updating service instance: ${error}`);
      next(error);
    }
  };

  public fetchLastOperation: RequestHandler = async (req, res, next) => {
    try {
      const instanceId = req.params.instanceId as string;
      const originatingIdentity = BrokerUtil.getIamId(req) ?? "";
      const response = await this.brokerService.lastOperation(instanceId, originatingIdentity);
      res.status(200).json(response);
    } catch (error) {
      logger.error(`Error fetching last operation: ${error}`);
      next(error);
    }
  };

  public getProvisionStatus: RequestHandler = async (req, res, next) => {
    try {
      const instanceId = String(req.query.instance_id ?? "");
      const type = String(req.query.type ?? "");

      const safeInstanceId = BrokerController.escapeHtml(instanceId);
      const safeType = BrokerController.escapeHtml(type);

      const homepage = `
        <html>
          <style>
            body {
              font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
              padding: 10px;
            }
            .flex-wrapper {
              display: flex;
              flex-direction: column;
            }
            .flex-row {
              display: flex;
              flex-direction: row;
              margin-top: 5px;
            }
            .strong-div {
              min-width: 10%;
            }
            .hr-short {
              width: 100%;
              background: lightgrey;
            }
          </style>
          <body>
            <h4>Deployment Details</h4>
            <div class="flex-wrapper">
              <div class="flex-row">
                <div class="strong-div"><strong>Type</strong></div>
                <div>${safeType}</div>
              </div>
              <hr class="hr-short"/>
              <div class="flex-row">
                <div class="strong-div"><strong>Instance ID</strong></div>
                <div>${safeInstanceId}</div>
              </div>
            </div>
          </body>
        </html>
      `;

      res.status(200).send(homepage);
    } catch (error) {
      logger.error(`Error generating provision status page: ${error}`);
      next(error);
    }
  };

  private static escapeHtml(value: string): string {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
}
