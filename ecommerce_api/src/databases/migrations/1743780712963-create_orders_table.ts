import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateOrdersTable1743780712963 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'delivery_status_id',
            type: 'int',
          },
          {
            name: 'customer_id',
            type: 'int',
          },
          {
            name: 'payment_id',
            type: 'int',
          },
          {
            name: 'note_id',
            type: 'int',
          },
          {
            name: 'code',
            type: 'varchar(100)',
          },
          {
            name: 'total',
            type: 'int',
          },
          {
            name: 'vat',
            type: 'int',
          },
          {
            name: 'discount',
            type: 'int',
          },
          // Phí ship (Nếu cần triển khai)
          {
            name: 'ship_fee',
            type: 'int',
          },
          {
            name: 'payment_status',
            type: 'enum',
            enum: ['unpaid', 'paid'],
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
      'orders',
      new TableForeignKey({
        columnNames: ['delivery_status_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'delivery_status',
        onDelete: 'CASCADE',
        name: 'orders_delivery_status_delivery_status_id_foreign_key', // Cấu trúc bảng1_bảng2_column_foreign_key
      }),
    );
    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        columnNames: ['customer_id'], // thuộc bảng "customer_order" (Bảng lịch sử lưu thông tin khách hàng mua) - nhỡ sau tài khoản xoá thì vẫn có thông tin để thống kê
        referencedColumnNames: ['id'],
        referencedTableName: 'customer_order',
        onDelete: 'CASCADE',
        name: 'orders_customer_order_customer_id_foreign_key', // Cấu trúc bảng1_bảng2_column_foreign_key
      }),
    );
    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        columnNames: ['payment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'payments',
        onDelete: 'CASCADE',
        name: 'orders_payments_payment_id_foreign_key', // Cấu trúc bảng1_bảng2_column_foreign_key
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders', true);
  }
}
