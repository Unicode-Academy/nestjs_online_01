import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateAddressListTable1743774885998 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'address_list',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'customer_id',
            type: 'int',
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
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'address_list',
      new TableForeignKey({
        columnNames: ['customer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'customers',
        onDelete: 'CASCADE',
        name: 'address_list_customer_id_foreign',
      }),
    );
    await queryRunner.createForeignKey(
      'address_list',
      new TableForeignKey({
        columnNames: ['province_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'provinces',
        onDelete: 'CASCADE',
        name: 'address_list_province_id_foreign',
      }),
    );
    await queryRunner.createForeignKey(
      'address_list',
      new TableForeignKey({
        columnNames: ['district_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'districts',
        onDelete: 'CASCADE',
        name: 'address_list_district_id_foreign',
      }),
    );
    await queryRunner.createForeignKey(
      'address_list',
      new TableForeignKey({
        columnNames: ['ward_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'wards',
        onDelete: 'CASCADE',
        name: 'address_list_ward_id_foreign',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('address_list');
  }
}
