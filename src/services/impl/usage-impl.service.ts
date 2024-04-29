import { UsageService } from '../usage.service'

export class UsageServiceImpl implements UsageService {
  async getCatalog(): Promise<string> {
    const exampleCatalog = JSON.stringify({
      services: [
        { id: '1', name: 'Service A', plans: [{ id: 'plan1', name: 'Basic' }] },
      ],
    })
    return exampleCatalog
  }
}
