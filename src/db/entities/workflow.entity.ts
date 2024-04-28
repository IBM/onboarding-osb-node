import { Column, Entity } from 'typeorm'
import { BaseEntity } from './base.entity'

@Entity({ name: 'workflow', synchronize: false })
export class Workflow extends BaseEntity {
  @Column({ name: 'iam_id' })
  iamId: string

  @Column({ name: 'instance_id' })
  instanceId: string

  @Column()
  operation: string

  @Column()
  status: string

  @Column()
  request: string

  @Column()
  response: string

  @Column({ name: 'create_date', type: 'timestamp' })
  createDate: Date

  @Column({ name: 'update_date', type: 'timestamp' })
  updateDate: Date
}
