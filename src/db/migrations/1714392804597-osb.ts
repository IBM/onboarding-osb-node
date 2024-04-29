import { MigrationInterface, QueryRunner } from "typeorm";

export class Osb1714392804597 implements MigrationInterface {
    name = 'Osb1714392804597'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "director" character varying NOT NULL, "year" integer NOT NULL, "rating" character varying NOT NULL, "image" character varying NOT NULL, "cast" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "monitor_component" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "url" character varying NOT NULL, "auth" character varying NOT NULL, "version" integer NOT NULL, CONSTRAINT "PK_cf1f72f692c0094a25a6b95daaa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "service_instance" ("id" SERIAL NOT NULL, "instance_id" character varying NOT NULL, "name" character varying NOT NULL, "iam_id" character varying NOT NULL, "plan_id" character varying NOT NULL, "service_id" character varying NOT NULL, "status" character varying NOT NULL, "region" character varying NOT NULL, "context" character varying(1024) NOT NULL, "parameters" character varying NOT NULL, "create_date" TIMESTAMP NOT NULL, "update_date" TIMESTAMP NOT NULL, CONSTRAINT "PK_b1d4cae4ddaaf4f4da7bb8062da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'user', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workflow" ("id" SERIAL NOT NULL, "iam_id" character varying NOT NULL, "instance_id" character varying NOT NULL, "operation" character varying NOT NULL, "status" character varying NOT NULL, "request" character varying NOT NULL, "response" character varying NOT NULL, "create_date" TIMESTAMP NOT NULL, "update_date" TIMESTAMP NOT NULL, CONSTRAINT "PK_eb5e4cc1a9ef2e94805b676751b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "workflow"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "service_instance"`);
        await queryRunner.query(`DROP TABLE "monitor_component"`);
        await queryRunner.query(`DROP TABLE "movies"`);
    }

}
