import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

// Giá trị thuộc tính
// Để dễ query - quản lý -> nên tách value thuộc tính thành từng record
// 2 TH: Cập nhật trước khi tạo SP, cập nhật cùng lúc khi tạo SP

export class CreateAttributeValuesTable1743777738619
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'attribute_values',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'attribute_id',
            type: 'int',
          },
          {
            name: 'value', // Giá trị thực -> hiển thị lên giao diện
            type: 'varchar(255)',
          },
          {
            name: 'label', // Label dùng quản lý
            type: 'varchar(255)',
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
      'attribute_values',
      new TableForeignKey({
        columnNames: ['attribute_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'attributes',
        onDelete: 'CASCADE',
        name: 'attribute_values_attributes_attribute_id_foreign_key', // Cấu trúc bảng1_bảng2_column_foreign_key
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('attribute_values', true);
  }
}
