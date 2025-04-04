import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateReviewsReplyTable1743776512656
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'reviews_reply',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'review_id',
            type: 'int',
          },
          {
            name: 'comment',
            type: 'text',
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
      'reviews_reply',
      new TableForeignKey({
        columnNames: ['review_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'reviews',
        onDelete: 'CASCADE',
        name: 'reviews_reply_review_id_foreign',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('reviews_reply');
  }
}
