import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateConversationTable1638343952902 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        
        await queryRunner.createTable(new Table({
            name: "conversation",
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
                }
            ]
        }), true);

        await queryRunner.createTable(new Table({
            name: "conversation_users_user",
            columns: [
                {
                    name: "conversationId",
                    type: "uuid",
                    isNullable: false
                },
                {
                    name: "userId",
                    type: "uuid",
                    isNullable: false
                }
            ]
        }), true);

        await queryRunner.createForeignKey("conversation_users_user", new TableForeignKey({
            columnNames: ["conversationId"],
            referencedColumnNames: ["id"],
            referencedTableName: "conversation",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("conversation_users_user", new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "user",
            onDelete: "CASCADE"
        }));

        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user_conversation');
        await queryRunner.dropTable('conversation', true);
    }
}
