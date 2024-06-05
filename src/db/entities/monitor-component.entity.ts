import { Column, Entity } from 'typeorm'
import { BaseEntity } from './base.entity'

@Entity({ name: 'monitor_component' })
export class MonitorComponent extends BaseEntity {
  @Column({ nullable: false })
  name: string

  @Column({ nullable: true })
  url: string

  @Column({ nullable: true })
  auth: string
}
