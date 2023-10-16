import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCascade1697466943643 implements MigrationInterface {
    name = 'AddCascade1697466943643'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "appointment_entity" DROP CONSTRAINT "FK_cec59a197b4816ff63bb68c6a58"
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment_entity" DROP CONSTRAINT "FK_b9148eaa46a0cfec32fc2e6b8ad"
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment_entity"
            ADD CONSTRAINT "FK_cec59a197b4816ff63bb68c6a58" FOREIGN KEY ("patientId") REFERENCES "patient_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment_entity"
            ADD CONSTRAINT "FK_b9148eaa46a0cfec32fc2e6b8ad" FOREIGN KEY ("doctorId") REFERENCES "doctor_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "appointment_entity" DROP CONSTRAINT "FK_b9148eaa46a0cfec32fc2e6b8ad"
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment_entity" DROP CONSTRAINT "FK_cec59a197b4816ff63bb68c6a58"
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment_entity"
            ADD CONSTRAINT "FK_b9148eaa46a0cfec32fc2e6b8ad" FOREIGN KEY ("doctorId") REFERENCES "doctor_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment_entity"
            ADD CONSTRAINT "FK_cec59a197b4816ff63bb68c6a58" FOREIGN KEY ("patientId") REFERENCES "patient_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
