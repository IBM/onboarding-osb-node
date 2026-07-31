import { Entity, Column, PrimaryColumn } from "typeorm";
import { BaseEntity } from "./base.entity.js";

@Entity({ name: "service_instance" })
export class ServiceInstance extends BaseEntity {
  @PrimaryColumn({ name: "instance_id", type: "varchar" })
  instanceId!: string;

  @Column({ type: "varchar", nullable: true })
  name!: string;

  @Column({ name: "iam_id", type: "varchar", nullable: true })
  iamId!: string;

  @Column({ name: "plan_id", type: "varchar", nullable: true })
  planId!: string;

  @Column({ name: "service_id", type: "varchar", nullable: true })
  serviceId!: string;

  @Column({ type: "varchar", nullable: true })
  status!: string;

  @Column({ type: "boolean", default: false })
  enabled!: boolean;

  @Column({ type: "varchar", nullable: true })
  region!: string;

  @Column({ type: "varchar", length: 1024, nullable: true })
  context!: string;

  @Column({ type: "varchar", nullable: true })
  parameters!: string;
}
