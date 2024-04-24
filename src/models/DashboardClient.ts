import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class DashboardClient {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  secret!: string;

  @Column()
  redirectUri!: string;
}
