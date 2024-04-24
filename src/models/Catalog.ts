import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ServiceDefinition } from './ServiceDefinition';

@Entity()
export class Catalog {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // @OneToMany(() => ServiceDefinition, serviceDefinition => serviceDefinition.catalog, {
  //     cascade: true,
  //     eager: true  // Automatically load service definitions with the catalog
  // })
  // serviceDefinitions: ServiceDefinition[];
}
