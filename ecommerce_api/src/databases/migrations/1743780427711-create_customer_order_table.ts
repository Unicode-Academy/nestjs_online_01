import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateCustomerOrderTable1743780427711
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'customer_order',
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
            name: 'ward_id',
            type: 'int',
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
            name: 'phone',
            type: 'varchar(15)',
            isUnique: true,
          },
          {
            name: 'birthday',
            type: 'date',
            isNullable: true,
            default: null,
          },
          {
            name: 'gender',
            type: 'enum',
            enum: ['male', 'female'],
            isNullable: true,
            default: null,
          },
          {
            name: 'tax_code',
            type: 'varchar(50)',
            isNullable: true,
            default: null,
          },
          {
            name: 'avatar',
            type: 'varchar(100)',
            isNullable: true,
            default: null,
          },
          {
            name: 'address',
            type: 'varchar(200)',
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
      'customer_order',
      new TableForeignKey({
        columnNames: ['province_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'provinces',
        onDelete: 'CASCADE',
        name: 'customer_order_provinces_province_id_foreign_key', // Cấu trúc bảng1_bảng2_column_foreign_key
      }),
    );
    await queryRunner.createForeignKey(
      'customer_order',
      new TableForeignKey({
        columnNames: ['district_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'districts',
        onDelete: 'CASCADE',
        name: 'customer_order_districts_district_id_foreign_key', // Cấu trúc bảng1_bảng2_column_foreign_key
      }),
    );
    await queryRunner.createForeignKey(
      'customer_order',
      new TableForeignKey({
        columnNames: ['ward_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'wards',
        onDelete: 'CASCADE',
        name: 'customer_order_wards_ward_id_foreign_key', // Cấu trúc bảng1_bảng2_column_foreign_key
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('customer_order', true);
  }
}
