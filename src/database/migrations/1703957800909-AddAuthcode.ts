import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAuthcode1703957800909 implements MigrationInterface {
    name = 'AddAuthcode1703957800909'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "authcode_entity" (
                "id" SERIAL NOT NULL,
                "code" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "userId" integer,
                CONSTRAINT "PK_065aae8c899459433a10d482c77" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "user_entity"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "user_entity"
            ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "authcode_entity"
            ADD CONSTRAINT "FK_82ca8197cf8a5d01a6505abc137" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "authcode_entity" DROP CONSTRAINT "FK_82ca8197cf8a5d01a6505abc137"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_entity" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_entity" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            DROP TABLE "authcode_entity"
        `);
    }

}
