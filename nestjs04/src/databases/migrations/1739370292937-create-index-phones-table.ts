import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm';

export class CreateIndexPhonesTable1739370292937 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createIndex(
      'phones',
      new TableIndex({
        name: 'phones_phone_index',
        columnNames: ['phone'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('phones', 'phones_phone_index');
  }
}
