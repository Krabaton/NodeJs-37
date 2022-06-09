import {MigrationInterface, QueryRunner} from "typeorm";

export class Test1654800678941 implements MigrationInterface {
    name = 'Test1654800678941'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_cat" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(150) NOT NULL, "age" integer NOT NULL, "is_vaccinated" integer NOT NULL DEFAULT (0))`);
        await queryRunner.query(`INSERT INTO "temporary_cat"("id", "name", "age") SELECT "id", "name", "age" FROM "cat"`);
        await queryRunner.query(`DROP TABLE "cat"`);
        await queryRunner.query(`ALTER TABLE "temporary_cat" RENAME TO "cat"`);
        await queryRunner.query(`CREATE TABLE "temporary_cat" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "age" integer NOT NULL, "is_vaccinated" integer NOT NULL DEFAULT (0))`);
        await queryRunner.query(`INSERT INTO "temporary_cat"("id", "name", "age", "is_vaccinated") SELECT "id", "name", "age", "is_vaccinated" FROM "cat"`);
        await queryRunner.query(`DROP TABLE "cat"`);
        await queryRunner.query(`ALTER TABLE "temporary_cat" RENAME TO "cat"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cat" RENAME TO "temporary_cat"`);
        await queryRunner.query(`CREATE TABLE "cat" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(150) NOT NULL, "age" integer NOT NULL, "is_vaccinated" integer NOT NULL DEFAULT (0))`);
        await queryRunner.query(`INSERT INTO "cat"("id", "name", "age", "is_vaccinated") SELECT "id", "name", "age", "is_vaccinated" FROM "temporary_cat"`);
        await queryRunner.query(`DROP TABLE "temporary_cat"`);
        await queryRunner.query(`ALTER TABLE "cat" RENAME TO "temporary_cat"`);
        await queryRunner.query(`CREATE TABLE "cat" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(150) NOT NULL, "age" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "cat"("id", "name", "age") SELECT "id", "name", "age" FROM "temporary_cat"`);
        await queryRunner.query(`DROP TABLE "temporary_cat"`);
    }

}
