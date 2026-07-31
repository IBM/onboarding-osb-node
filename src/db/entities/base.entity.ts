import { Column, BaseEntity as TypeOrmBaseEntity } from 'typeorm'

export abstract class BaseEntity extends TypeOrmBaseEntity {
  @Column({
    name: 'create_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createDate!: Date

  @Column({
    name: 'update_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateDate!: Date

  /**
   * PostgreSQL bigint is represented as a string by TypeORM/Node.js
   * to avoid JavaScript number precision loss for values > 2^53.
   */
  @Column({ type: 'bigint', nullable: true })
  version!: string
}
