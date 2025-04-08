import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

// Bảng mã giảm giá áp dụng cho sp nào
export class CreateCouponProductsTable1743832066625
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'coupon_products',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'coupon_id',
            type: 'int',
          },
          {
            name: 'product_id',
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
      'coupon_products',
      new TableForeignKey({
        columnNames: ['coupon_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'coupons',
        onDelete: 'CASCADE',
        name: 'coupon_products_coupons_coupon_id_foreign_key', // Cấu trúc bảng1_bảng2_column_foreign_key
      }),
    );
    await queryRunner.createForeignKey(
      'coupon_products',
      new TableForeignKey({
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'CASCADE',
        name: 'coupon_products_products_product_id_foreign_key', // Cấu trúc bảng1_bảng2_column_foreign_key
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('coupon_products', true);
  }
}
