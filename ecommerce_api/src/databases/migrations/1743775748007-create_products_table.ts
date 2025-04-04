import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateProductsTable1743775748007 implements MigrationInterface {
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
            name: 'sku',
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
            name: 'brand_id',
            type: 'int',
            isNullable: true,
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
            isNullable: true,
          },
          {
            name: 'rating',
            type: 'double(20,2)',
            isNullable: true,
          },
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
        name: 'products_brand_id_foreign',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  }
}
