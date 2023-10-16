import { MigrationInterface, QueryRunner } from "typeorm";

export class PhoneNumberUnique1697467203794 implements MigrationInterface {
    name = 'PhoneNumberUnique1697467203794'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "patient_entity"
            ADD CONSTRAINT "UQ_68c234212bb944ad4ad0c59abb1" UNIQUE ("phoneNumber")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "patient_entity" DROP CONSTRAINT "UQ_68c234212bb944ad4ad0c59abb1"
        `);
    }

}
