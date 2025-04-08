import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateCategoriesTable1743775329868 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'categories',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'parent_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'name',
            type: 'varchar(200)',
          },
          {
            name: 'slug',
            type: 'varchar(200)',
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['active', 'inactive'],
            default: '"active"',
          },
          {
            name: 'image',
            type: 'varchar(200)',
            isNullable: true,
            default: null,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
            default: null,
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
    await queryRunner.createForeignKey(
      'categories',
      new TableForeignKey({
        columnNames: ['parent_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'categories',
        name: 'categories_parent_id_foreign_key', // Cấu trúc bảng1_bảng2_column_foreign_key
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('categories', true);
  }
}
