import {MigrationInterface, QueryRunner} from "typeorm";

export class AddVendurePluginOrderPdfs1739739984585 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "pdf_template" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "channelId" character varying NOT NULL, "name" character varying NOT NULL, "enabled" boolean NOT NULL DEFAULT true, "public" boolean NOT NULL DEFAULT false, "templateString" text NOT NULL, "id" SERIAL NOT NULL, CONSTRAINT "PK_52c2591b925a58006be92076e0b" PRIMARY KEY ("id"))`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "pdf_template"`, undefined);
   }

}
