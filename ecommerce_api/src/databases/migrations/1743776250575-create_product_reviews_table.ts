import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateProductReviewsTable1743776250575
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product_reviews',
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
            name: 'customer_id',
            type: 'int',
          },
          {
            name: 'rating',
            type: 'tinyint',
            default: 1,
          },
          {
            name: 'comment',
            type: 'text',
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['active', 'inactive'],
            default: '"active"',
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
      'product_reviews',
      new TableForeignKey({
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        name: 'product_reviews_products_product_id_foreign_key', // Cấu trúc bảng1_bảng2_column_foreign_key
      }),
    );
    await queryRunner.createForeignKey(
      'product_reviews',
      new TableForeignKey({
        columnNames: ['customer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'customers',
        name: 'product_reviews_customers_customer_id_foreign_key', // Cấu trúc bảng1_bảng2_column_foreign_key
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('product_reviews', true);
  }
}
