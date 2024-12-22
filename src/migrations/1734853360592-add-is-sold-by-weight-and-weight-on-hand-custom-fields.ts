import {MigrationInterface, QueryRunner} from "typeorm";

export class AddIsSoldByWeightAndWeightOnHandCustomFields1734853360592 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "public"."IDX_94e15d5f12d355d117390131ac"`, undefined);
        await queryRunner.query(`DROP INDEX "public"."IDX_e5598363000cab9d9116bd5835"`, undefined);
        await queryRunner.query(`DROP INDEX "public"."IDX_f3a761f6bcfabb474b11e1e51f"`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_level" ADD "customFieldsWeightonhand" double precision`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" ADD "customFieldsIssoldbyweight" boolean DEFAULT false`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant_translation" ALTER COLUMN "customFieldsOrigin" SET DEFAULT 'Martinique'`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product_variant_translation" ALTER COLUMN "customFieldsOrigin" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" DROP COLUMN "customFieldsIssoldbyweight"`, undefined);
        await queryRunner.query(`ALTER TABLE "stock_level" DROP COLUMN "customFieldsWeightonhand"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_f3a761f6bcfabb474b11e1e51f" ON "history_entry" ("discriminator") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_e5598363000cab9d9116bd5835" ON "session" ("type") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_94e15d5f12d355d117390131ac" ON "stock_movement" ("discriminator") `, undefined);
   }

}
