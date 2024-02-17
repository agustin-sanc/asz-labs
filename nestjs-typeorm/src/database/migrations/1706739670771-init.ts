import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1706739670771 implements MigrationInterface {
  name = 'Init1706739670771';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "band" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "genre" character varying(255) NOT NULL, "birthDate" date NOT NULL, CONSTRAINT "PK_e808d7dacf72163737ce93d7b23" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "musician" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "instrument" character varying(255) NOT NULL, CONSTRAINT "PK_4882f033208324a695dd353f2ce" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "band_musicians_musician" ("bandId" integer NOT NULL, "musicianId" integer NOT NULL, CONSTRAINT "PK_d9f326aeaa9093cf30640915a34" PRIMARY KEY ("bandId", "musicianId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b9ade43d068de3404031e1ea24" ON "band_musicians_musician" ("bandId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_47e3ae4943ad0bb80d3bead66a" ON "band_musicians_musician" ("musicianId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "musician_bands_band" ("musicianId" integer NOT NULL, "bandId" integer NOT NULL, CONSTRAINT "PK_d020ce153834a8f53f25ff97285" PRIMARY KEY ("musicianId", "bandId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_591da733023ab38929798993e2" ON "musician_bands_band" ("musicianId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cafb457914a525c515f315958d" ON "musician_bands_band" ("bandId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "band_musicians_musician" ADD CONSTRAINT "FK_b9ade43d068de3404031e1ea246" FOREIGN KEY ("bandId") REFERENCES "band"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "band_musicians_musician" ADD CONSTRAINT "FK_47e3ae4943ad0bb80d3bead66a7" FOREIGN KEY ("musicianId") REFERENCES "musician"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "musician_bands_band" ADD CONSTRAINT "FK_591da733023ab38929798993e2c" FOREIGN KEY ("musicianId") REFERENCES "musician"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "musician_bands_band" ADD CONSTRAINT "FK_cafb457914a525c515f315958dc" FOREIGN KEY ("bandId") REFERENCES "band"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "musician_bands_band" DROP CONSTRAINT "FK_cafb457914a525c515f315958dc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "musician_bands_band" DROP CONSTRAINT "FK_591da733023ab38929798993e2c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "band_musicians_musician" DROP CONSTRAINT "FK_47e3ae4943ad0bb80d3bead66a7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "band_musicians_musician" DROP CONSTRAINT "FK_b9ade43d068de3404031e1ea246"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cafb457914a525c515f315958d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_591da733023ab38929798993e2"`,
    );
    await queryRunner.query(`DROP TABLE "musician_bands_band"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_47e3ae4943ad0bb80d3bead66a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b9ade43d068de3404031e1ea24"`,
    );
    await queryRunner.query(`DROP TABLE "band_musicians_musician"`);
    await queryRunner.query(`DROP TABLE "musician"`);
    await queryRunner.query(`DROP TABLE "band"`);
  }
}
