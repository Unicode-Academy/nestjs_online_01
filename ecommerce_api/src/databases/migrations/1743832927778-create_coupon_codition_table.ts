import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateCouponCoditionTable1743832927778
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'coupon_codition',
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
            name: 'compare',
            type: 'enum',
            /**
             * gt: lớn hơn,
             * gte: lớn hơn hoặc bằng,
             * lt: bé hơn,
             * lte: bé hơn hoặc bằng
             */
            enum: ['gt', 'gte', 'lt', 'lte'],
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
      'coupon_codition',
      new TableForeignKey({
        columnNames: ['coupon_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'coupons',
        onDelete: 'CASCADE',
        name: 'coupon_codition_coupons_coupon_id_foreign_key', // Cấu trúc bảng1_bảng2_column_foreign_key
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('coupon_codition', true);
  }
}
