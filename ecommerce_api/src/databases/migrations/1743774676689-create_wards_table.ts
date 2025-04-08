import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateWardsTable1743774676689 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'wards',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'province_id',
            type: 'int',
          },
          {
            name: 'district_id',
            type: 'int',
          },
          {
            name: 'name',
            type: 'varchar(200)',
          },
          {
            name: 'prefix',
            type: 'varchar(100)',
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
      'wards',
      new TableForeignKey({
        columnNames: ['province_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'provinces',
        onDelete: 'CASCADE',
        name: 'wards_provinces_province_id_foreign_key', // Cấu trúc bảng1_bảng2_column_foreign_key
      }),
    );
    await queryRunner.createForeignKey(
      'wards',
      new TableForeignKey({
        columnNames: ['district_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'districts',
        onDelete: 'CASCADE',
        name: 'wards_districts_district_id_foreign_key', // Cấu trúc bảng1_bảng2_column_foreign_key
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('wards', true);
  }
}
