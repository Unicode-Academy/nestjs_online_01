import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1743770544990 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar(50)',
          },
          {
            name: 'email',
            type: 'varchar(100)',
          },
          {
            name: 'password',
            type: 'varchar(100)',
            isNullable: true,
          },
          {
            name: 'status',
            type: `enum`,
            enum: ['active', 'inactive'],
            default: '"active"',
          },
          {
            name: 'user_type',
            type: 'enum',
            enum: ['user', 'admin'],
          },
          {
            name: 'verify_at',
            type: 'timestamp',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users', true);
  }
}
