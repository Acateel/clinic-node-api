import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUser1703266619411 implements MigrationInterface {
    name = 'AddUser1703266619411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."user_entity_role_enum" AS ENUM('doctor', 'patient', 'admin')
        `);
        await queryRunner.query(`
            CREATE TABLE "user_entity" (
                "id" SERIAL NOT NULL,
                "email" character varying,
                "phoneNumber" character varying(15),
                "password" character varying NOT NULL,
                "role" "public"."user_entity_role_enum" NOT NULL DEFAULT 'patient',
                CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"),
                CONSTRAINT "UQ_d32231375a97904922ddad3eaff" UNIQUE ("phoneNumber"),
                CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user_entity"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."user_entity_role_enum"
        `);
    }

}
