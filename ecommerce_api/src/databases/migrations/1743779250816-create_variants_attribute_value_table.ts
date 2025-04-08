import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateVariantsAttributeValueTable1743779250816
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'variants_attribute_value',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'variant_id',
            type: 'int',
          },
          {
            name: 'attribute_value_id',
            type: 'int',
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
      'variants_attribute_value',
      new TableForeignKey({
        columnNames: ['attribute_value_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'attribute_values',
        onDelete: 'CASCADE',
        name: 'variants_attribute_value_attribute_value_id_foreign_key', // Cấu trúc bảng1_bảng2_column_foreign_key
      }),
    );
    await queryRunner.createForeignKey(
      'variants_attribute_value',
      new TableForeignKey({
        columnNames: ['variant_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'variants',
        onDelete: 'CASCADE',
        name: 'variants_attribute_value_variants_variant_id_foreign_key', // Cấu trúc bảng1_bảng2_column_foreign_key
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('variants_attribute_value', true);
  }
}
