import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateProductsTable1743775685906 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'brand_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'sku', // Stock Keeping Unit, mã SKU trên sản phẩm chính là mã hàng hóa để giúp cho việc phân loại hàng hóa trong kho được chi tiết hơn
            type: 'varchar(100)',
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
          /*
                Kiểu sản phẩm: simple -> không có biến thể, variant: biến thể, tổ hợp các atrribute lại với nhau. VD: Màu đen có 2 loại RAM 64, 128GB; Màu đỏ: có 2 loại RAM 128GB, 520GB"
               */
          {
            name: 'type',
            type: 'enum',
            enum: ['simple', 'variant'],
            default: '"simple"',
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
      'products',
      new TableForeignKey({
        columnNames: ['brand_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'brands',
        name: 'products_brands_brand_id_foreign_key', // Cấu trúc bảng1_bảng2_column_foreign_key
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products', true);
  }
}
