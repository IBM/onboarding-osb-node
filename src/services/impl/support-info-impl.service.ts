import { SupportInfoService } from '../support-info.service'

export class SupportInfoServiceImpl implements SupportInfoService {
  async getCatalog(): Promise<string> {
    const exampleCatalog = JSON.stringify({
      services: [
        { id: '1', name: 'Service A', plans: [{ id: 'plan1', name: 'Basic' }] },
      ],
    })
    return exampleCatalog
  }
}
