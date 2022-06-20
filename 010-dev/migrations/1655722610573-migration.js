const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class migration1655722610573 {
    name = 'migration1655722610573'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "station" ("id" character varying NOT NULL, "createdat" TIMESTAMP WITH TIME ZONE NOT NULL, "name" character varying NOT NULL, "brand" character varying NOT NULL, "street" character varying NOT NULL, "houseNumber" character varying NOT NULL, "postCode" character varying NOT NULL, "city" character varying NOT NULL, "distance" numeric NOT NULL, CONSTRAINT "PK_cad1b3e7182ef8df1057b82f6aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "price" ("id" character varying NOT NULL, "createdat" TIMESTAMP WITH TIME ZONE NOT NULL, "isOpen" boolean NOT NULL, "diesel" numeric NOT NULL, "e5" numeric NOT NULL, "e10" numeric NOT NULL, CONSTRAINT "PK_066af92dd723c6bed854c78f250" PRIMARY KEY ("id", "createdat"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "price"`);
        await queryRunner.query(`DROP TABLE "station"`);
    }
}
