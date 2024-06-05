import { Plan } from '../models/plan.model'
import { Catalog } from '../models/catalog.model'

export class CatalogUtil {
  static COSTS = 'costs'
  static METERING_UNIT = 'meteringUnit'
  static CREDIT_PLAN = 'virtualcoursecredit-subscription-plan'
  static BASE_PLAN = 'computinglab-base-plan'
  static PREMIUM_PLAN = 'computinglab-premium-plan'
  static LITE_PLAN = 'lite'

  public static getPlan(
    catalog: Catalog,
    serviceId: string,
    planId: string,
  ): Plan | null {
    if (!serviceId || !planId) {
      return null
    }

    for (const service of catalog.services) {
      if (serviceId === service.id) {
        for (const plan of service.plans) {
          if (planId === plan.id) {
            return plan
          }
        }
      }
    }

    return null
  }

  public static getMeteringUnits(catalog: Catalog): Map<string, string[]> {
    const catalogMeteringUnits = new Map<string, string[]>()

    for (const plan of catalog.services[0].plans) {
      const planCosts = plan.metadata[CatalogUtil.COSTS]

      if (Array.isArray(planCosts)) {
        const planMeteringUnits: string[] = []

        for (const cost of planCosts) {
          if (cost[CatalogUtil.METERING_UNIT]) {
            planMeteringUnits.push(cost[CatalogUtil.METERING_UNIT])
          }
        }
        catalogMeteringUnits.set(plan.id, planMeteringUnits)
      }
    }

    return catalogMeteringUnits
  }
}
