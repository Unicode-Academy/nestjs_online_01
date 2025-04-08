import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateCouponUsageTable1743833114953 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'coupon_usage',
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
            /**
             * 1 coupon - chỉ áp dụng cho 1 đơn hàng và ngược lại. tránh áp dụng nhiều mã =)))
             */
            name: 'order_id',
            type: 'int',
          },
          {
            name: 'coupon_code',
            type: 'varchar(100)',
          },
          {
            name: 'discount_value',
            type: 'int',
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['failed', 'success'],
            default: '"failed"',
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
      'coupon_usage',
      new TableForeignKey({
        columnNames: ['coupon_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'coupons',
        onDelete: 'CASCADE',
        name: 'coupon_usage_coupons_coupon_id_foreign_key', // Cấu trúc bảng1_bảng2_column_foreign_key
      }),
    );
    await queryRunner.createForeignKey(
      'coupon_usage',
      new TableForeignKey({
        columnNames: ['order_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
        onDelete: 'CASCADE',
        name: 'coupon_usage_orders_order_id_foreign_key', // Cấu trúc bảng1_bảng2_column_foreign_key
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('coupon_usage', true);
  }
}
