import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateReviewImagesTable1743776748548
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'review_images',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'imageable_id',
            type: 'int',
          },
          {
            name: 'imageable_type',
            type: 'enum',
            enum: ['product_reviews', 'reviews_reply'],
          },
          {
            name: 'image',
            type: 'varchar(200)',
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
      'review_images',
      new TableForeignKey({
        columnNames: ['imageable_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product_reviews',
        onDelete: 'CASCADE',
        name: 'review_images_product_reviews_imageable_id_foreign_key', // Cấu trúc bảng1_bảng2_column_foreign_key
      }),
    );
    await queryRunner.createForeignKey(
      'review_images',
      new TableForeignKey({
        columnNames: ['imageable_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'reviews_reply',
        onDelete: 'CASCADE',
        name: 'review_images_reviews_reply_imageable_id_foreign_key', // Cấu trúc bảng1_bảng2_column_foreign_key
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('review_images', true);
  }
}
