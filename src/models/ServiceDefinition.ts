import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Plan } from './Plan';
import { DashboardClient } from './DashboardClient';

@Entity()
export class ServiceDefinition {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  bindable!: boolean;

  @Column({ type: 'boolean', nullable: true })
  planUpdateable?: boolean | null;

  // @OneToMany(() => Plan, (plan) => plan.serviceDefinition, {
  //   cascade: true,
  // })
  // plans!: Plan[];

  @Column('simple-array')
  tags!: string[];

  @Column('simple-json', { nullable: true })
  metadata?: Record<string, any>;

  @Column('simple-array', { nullable: true })
  requires?: string[];

  @ManyToOne(() => DashboardClient, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  @JoinColumn()
  dashboardClient?: DashboardClient | null;
}
