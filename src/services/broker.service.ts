export interface BrokerService {
  getCatalog(): Promise<string>
}
