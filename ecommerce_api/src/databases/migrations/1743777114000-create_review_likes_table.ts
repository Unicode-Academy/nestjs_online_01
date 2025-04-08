import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateReviewLikesTable1743777114000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'review_likes',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'customer_id',
            type: 'int',
          },
          {
            name: 'likeable_id',
            type: 'int',
          },
          {
            name: 'likeable_type',
            type: 'enum',
            enum: ['product_reviews', 'reviews_reply'],
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
      'review_likes',
      new TableForeignKey({
        columnNames: ['likeable_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product_reviews',
        onDelete: 'CASCADE',
        name: 'review_likes_product_reviews_likeable_id_foreign_key', // Cấu trúc bảng1_bảng2_column_foreign_key
      }),
    );
    await queryRunner.createForeignKey(
      'review_likes',
      new TableForeignKey({
        columnNames: ['likeable_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'reviews_reply',
        onDelete: 'CASCADE',
        name: 'review_likes_reviews_reply_likeable_id_foreign_key', // Cấu trúc bảng1_bảng2_column_foreign_key
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('review_likes', true);
  }
}
