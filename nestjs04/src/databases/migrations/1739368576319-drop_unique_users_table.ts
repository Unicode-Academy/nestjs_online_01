import { MigrationInterface, QueryRunner, TableUnique } from 'typeorm';

export class DropUniqueUsersTable1739368576319 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE users DROP INDEX users_email_unique`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX users_email_unique ON users(email)`,
    );
  }
}
