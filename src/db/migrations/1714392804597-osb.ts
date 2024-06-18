import { MigrationInterface, QueryRunner } from 'typeorm'

export class Osb1714392804597 implements MigrationInterface {
  name = 'Osb1714392804597'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "service_instance" ("id" SERIAL NOT NULL, "instance_id" character varying NOT NULL, "name" character varying NOT NULL, "iam_id" character varying NOT NULL, "plan_id" character varying NOT NULL, "service_id" character varying NOT NULL, "status" character varying NOT NULL, "region" character varying NOT NULL, "context" character varying(1024) NOT NULL, "parameters" character varying NOT NULL, "create_date" TIMESTAMP NOT NULL, "update_date" TIMESTAMP NOT NULL, CONSTRAINT "PK_b1d4cae4ddaaf4f4da7bb8062da" PRIMARY KEY ("id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "service_instance"`)
  }
}
