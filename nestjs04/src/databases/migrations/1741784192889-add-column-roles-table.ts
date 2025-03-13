import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnRolesTable1741784192889 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE roles ADD is_root TINYINT(1) DEFAULT 0 AFTER status`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('roles', 'is_root');
  }
}
