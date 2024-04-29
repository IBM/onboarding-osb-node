import { BrokerService } from '../broker.service'

export class BrokerServiceImpl implements BrokerService {
  async getCatalog(): Promise<string> {
    const exampleCatalog = JSON.stringify({
      services: [
        { id: '1', name: 'Service A', plans: [{ id: 'plan1', name: 'Basic' }] },
      ],
    })
    return exampleCatalog
  }
}
