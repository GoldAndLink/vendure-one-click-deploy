import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPriceDetailsPackagingDetailsOriginAlternateNameCustomFields1734277969974 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "customFieldsTest"`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant_translation" ADD "customFieldsPricedetails" character varying(255)`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant_translation" ADD "customFieldsPackagingdetails" character varying(255)`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant_translation" ADD "customFieldsOrigin" character varying(255)`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant_translation" ADD "customFieldsAlternatename" character varying(255)`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product_variant_translation" DROP COLUMN "customFieldsAlternatename"`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant_translation" DROP COLUMN "customFieldsOrigin"`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant_translation" DROP COLUMN "customFieldsPackagingdetails"`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant_translation" DROP COLUMN "customFieldsPricedetails"`, undefined);
        await queryRunner.query(`ALTER TABLE "product" ADD "customFieldsTest" character varying(255)`, undefined);
   }

}
