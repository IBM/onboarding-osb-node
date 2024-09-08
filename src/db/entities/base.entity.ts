import {
  Column,
  PrimaryGeneratedColumn,
  BaseEntity as TypeOrmBaseEntity,
} from 'typeorm'

export abstract class BaseEntity extends TypeOrmBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

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

  @Column({ type: 'bigint', nullable: true })
  version!: string
}
