import { Router } from "express";
import { BrokerRoutes } from "./broker.routes.js";
import { UsageRoutes } from "./usage.routes.js";
import { SupportInfoRoutes } from "./support-info.routes.js";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/", BrokerRoutes.routes);
    router.use("/", SupportInfoRoutes.routes);
    router.use("/", UsageRoutes.routes);

    return router;
  }
}
