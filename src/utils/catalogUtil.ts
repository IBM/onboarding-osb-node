import { Plan } from '../models/plan.model'
import { Catalog } from '../models/catalog.model'

export class CatalogUtil {
  public static readonly COSTS = 'costs'
  public static readonly METERING_UNIT = 'meteringUnit'
  public static readonly CREDIT_PLAN = 'virtualcoursecredit-subscription-plan'
  public static readonly BASE_PLAN = 'computinglab-base-plan'
  public static readonly PREMIUM_PLAN = 'computinglab-premium-plan'
  public static readonly LITE_PLAN = 'lite'

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
