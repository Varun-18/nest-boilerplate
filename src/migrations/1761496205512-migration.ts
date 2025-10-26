import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1761496205512 implements MigrationInterface {
  name = 'Migration1761496205512';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "core"."users_role_enum" AS ENUM('ADMIN', 'END_USER')`,
    );
    await queryRunner.query(
      `CREATE TABLE "core"."users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "role" "core"."users_role_enum" NOT NULL DEFAULT 'END_USER', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "core"."users"`);
    await queryRunner.query(`DROP TYPE "core"."users_role_enum"`);
  }
}
