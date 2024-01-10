import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateMessageTable1638343952903 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        
        await queryRunner.createTable(new Table({
            name: "message",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "uuid_generate_v4()"
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "deleted_at",
                    type: "timestamp",
                    isNullable: true
                },
                {
                    name: "content",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "type",
                    type: "varchar",
                    default: "'text'"
                },
                {
                    name: "multimedia_url",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "user_id",
                    type: "uuid"
                },
                {
                    name: "conversation_id",
                    type: "uuid"
                }
            ]
        }), true);

        await queryRunner.createForeignKey("message", new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "user",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("message", new TableForeignKey({
            columnNames: ["conversation_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "conversation",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('message', true);
    }
}
