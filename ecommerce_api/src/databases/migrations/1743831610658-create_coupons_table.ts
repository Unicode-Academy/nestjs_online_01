import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCouponsTable1743831610658 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'coupons',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'code',
            type: 'varchar(100)',
          },
          {
            name: 'start_date',
            type: 'timestamp',
          },
          {
            name: 'end_date',
            type: 'timestamp',
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['limit', 'unlimit'],
          },
          {
            name: 'quantity_use', // Giới hạn số lần dùng mã giảm giá
            type: 'tinyint',
            default: 0,
          },
          {
            name: 'discount_type',
            type: 'enum',
            enum: ['amount', 'percent'],
          },
          {
            name: 'discount_value',
            type: 'int',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('coupons', true);
  }
}
