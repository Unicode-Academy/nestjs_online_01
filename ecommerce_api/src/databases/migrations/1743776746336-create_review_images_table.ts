import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateReviewImagesTable1743776746336
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
            enum: ['review', 'reply'],
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
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'review_images',
      new TableForeignKey({
        columnNames: ['imageable_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'reviews',
        onDelete: 'CASCADE',
        name: 'review_images_imageable_id_reviews_foreign',
      }),
    );
    await queryRunner.createForeignKey(
      'review_images',
      new TableForeignKey({
        columnNames: ['imageable_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'reviews_reply',
        onDelete: 'CASCADE',
        name: 'review_images_imageable_id_reviews_reply_foreign',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('review_images');
  }
}
