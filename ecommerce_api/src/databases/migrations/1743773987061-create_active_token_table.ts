import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateActiveTokenTable1743773987061 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'active_token',
            columns: [
                {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment'
                },
                {
                name: 'user_id',
                type: 'int',
                isNullable: true
                },
                {
                name: 'token',
                type: 'varchar(100)'
                },
                {
                name: 'expire_at',
                type: 'timestamp',
                },
                {
                name: 'created_at',
                type: 'timestamp',
                default: 'now()'
                },
                {
                name: 'updated_at',
                type: 'timestamp',
                default: 'now()',
                onUpdate: 'now()'
                }
            ]
            }));    
        await queryRunner.createForeignKey('active_token', new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        name: 'active_token_users_user_id_foreign_key' // Cấu trúc bảng1_bảng2_column_foreign_key
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.dropTable('active_token', true)
    }

}
