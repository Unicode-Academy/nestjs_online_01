import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateDeliveryStatusTable1743779362797
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'delivery_status',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          //   'pending', 'confirmed', 'pick_up', 'on_the_way', 'delivered', 'cancel'
          {
            name: 'name',
            type: 'varchar(50)',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('delivery_status', true);
  }
}
