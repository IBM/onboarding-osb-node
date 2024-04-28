import { Column, Entity } from 'typeorm'
import { BaseEntity } from './base.entity'

@Entity({ name: 'monitor_component', synchronize: false })
export class MonitorComponent extends BaseEntity {
  @Column()
  name: string

  @Column()
  url: string

  @Column()
  auth: string

  @Column()
  version: number
}
