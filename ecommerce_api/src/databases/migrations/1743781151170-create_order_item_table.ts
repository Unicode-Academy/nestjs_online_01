import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateOrderItemTable1743781151170 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order_item',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'sku',
            type: 'varchar(100)',
          },
          {
            name: 'brand_id',
            type: 'int',
          },
          {
            name: 'name',
            type: 'varchar(255)',
          },
          {
            name: 'slug',
            type: 'varchar(255)',
          },
          {
            name: 'thumbnail',
            type: 'varchar(200)',
            isNullable: true,
          },
          {
            name: 'price',
            type: 'int',
            default: 0,
          },
          {
            name: 'sale_price',
            type: 'int',
            default: 0,
          },
          {
            name: 'content',
            type: 'text',
          },
          {
            name: 'rating_ammount',
            type: 'double(20, 2)',
            default: 0,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['active', 'inactive'],
            default: '"active"',
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['simple', 'variant'],
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
      'order_item',
      new TableForeignKey({
        columnNames: ['brand_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'brands',
        onDelete: 'CASCADE',
        name: 'order_item_brands_brand_id_foreign_key', // Cấu trúc bảng1_bảng2_column_foreign_key
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('order_item', true);
  }
}
