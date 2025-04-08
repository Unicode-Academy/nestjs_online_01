import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1743770563738 implements MigrationInterface {
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
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar(100)',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['active', 'inactive'],
            enumName: 'statusEnum',
            default: '"active"',
          },
          {
            name: 'user_type',
            type: 'enum',
            enum: ['admin', 'user'],
            default: '"user"',
          },
          {
            name: 'verify_at',
            type: 'timestamp',
            isNullable: true,
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
            onUpdate: 'now()',
          },
        ],
      }),
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX users_email_unique ON users(email)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users', true);
  }
}
