import { Entity, Column } from 'typeorm'
import { BaseEntity } from './base.entity'

@Entity({ name: 'workflow' })
export class Workflow extends BaseEntity {
  @Column({ name: 'iam_id', nullable: true })
  iamId: string

  @Column({ name: 'instance_id', nullable: true })
  instanceId: string

  @Column({ nullable: true })
  operation: string

  @Column({ nullable: true })
  status: string

  @Column({ length: 1024, nullable: true })
  request: string

  @Column({ length: 1024, nullable: true })
  response: string
}
