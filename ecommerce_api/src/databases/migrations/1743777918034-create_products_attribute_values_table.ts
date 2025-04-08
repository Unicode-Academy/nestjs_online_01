import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateProductsAttributeValuesTable1743777918034
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products_attribute_values',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'product_id',
            type: 'int',
          },
          {
            name: 'attribute_id',
            type: 'int',
          },
          {
            name: 'attribute_value_id',
            type: 'int',
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
      'products_attribute_values',
      new TableForeignKey({
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'CASCADE',
        name: 'products_attribute_values_products_product_id_foreign_key', // Cấu trúc bảng1_bảng2_column_foreign_key
      }),
    );
    await queryRunner.createForeignKey(
      'products_attribute_values',
      new TableForeignKey({
        columnNames: ['attribute_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'attributes',
        onDelete: 'CASCADE',
        name: 'products_attribute_values_attributes_attribute_id_foreign_key', // Cấu trúc bảng1_bảng2_column_foreign_key
      }),
    );
    await queryRunner.createForeignKey(
      'products_attribute_values',
      new TableForeignKey({
        columnNames: ['attribute_value_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'attribute_values',
        onDelete: 'CASCADE',
        name: 'products_attribute_values_attribute_value_id_foreign_key', // Cấu trúc bảng1_bảng2_column_foreign_key
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products_attribute_values', true);
  }
}
