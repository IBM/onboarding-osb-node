import { Entity, Column } from 'typeorm'
import { BaseEntity } from './base.entity'

@Entity({ name: 'service_instance' })
export class ServiceInstance extends BaseEntity {
  @Column({ name: 'instance_id' })
  instanceId: string

  @Column()
  name: string

  @Column({ name: 'iam_id' })
  iamId: string

  @Column({ name: 'plan_id' })
  planId: string

  @Column({ name: 'service_id' })
  serviceId: string

  @Column()
  status: string

  @Column()
  region: string

  @Column({ length: 1024 })
  context: string

  @Column()
  parameters: string

  @Column({ name: 'create_date', type: 'timestamp' })
  createDate: Date

  @Column({ name: 'update_date', type: 'timestamp' })
  updateDate: Date

  @Column()
  enabled: boolean
}
