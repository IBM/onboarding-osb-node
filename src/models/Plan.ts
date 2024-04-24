import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Plan {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column({ type: 'json', nullable: true })
  metadata?: Record<string, any>;

  @Column({ type: 'boolean', nullable: true })
  free?: boolean;
}
