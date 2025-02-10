import { MigrationInterface, QueryRunner } from "typeorm";

export class TestGenerate1739200522771 implements MigrationInterface {
    name = 'TestGenerate1739200522771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`posts_categories\` (\`categoriesId\` int NOT NULL, \`postsId\` int NOT NULL, INDEX \`IDX_9668e184ba01275dae5e2b31da\` (\`categoriesId\`), INDEX \`IDX_88e8823bd8fc0551d516cdd87f\` (\`postsId\`), PRIMARY KEY (\`categoriesId\`, \`postsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`created_at\` \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`updated_at\` \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`posts_categories\` ADD CONSTRAINT \`FK_9668e184ba01275dae5e2b31da6\` FOREIGN KEY (\`categoriesId\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`posts_categories\` ADD CONSTRAINT \`FK_88e8823bd8fc0551d516cdd87f4\` FOREIGN KEY (\`postsId\`) REFERENCES \`posts\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts_categories\` DROP FOREIGN KEY \`FK_88e8823bd8fc0551d516cdd87f4\``);
        await queryRunner.query(`ALTER TABLE \`posts_categories\` DROP FOREIGN KEY \`FK_9668e184ba01275dae5e2b31da6\``);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`updated_at\` \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`DROP INDEX \`IDX_88e8823bd8fc0551d516cdd87f\` ON \`posts_categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_9668e184ba01275dae5e2b31da\` ON \`posts_categories\``);
        await queryRunner.query(`DROP TABLE \`posts_categories\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
    }

}
