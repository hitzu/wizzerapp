import { MigrationInterface, QueryRunner } from 'typeorm';

export class PopulateTables1638343952904 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "user" (id, name)
      VALUES 
        ('7c1af18f-9c05-4324-829d-949f6d7bd970', 'User 1'),
        ('7c1af18f-9c05-4324-829d-949f6d7bd971', 'User 2'),
        ('7c1af18f-9c05-4324-829d-949f6d7bd972', 'User 3')
      `);

    await queryRunner.query(`
         INSERT INTO conversation (id, created_at) VALUES 
             ('6fbb48e5-d1cf-423e-b828-fc8b35b43b10', '2024-01-10 18:42:16.492'),
             ('6fbb48e5-d1cf-423e-b828-fc8b35b43b11', '2024-01-10 18:42:16.492'),
             ('6fbb48e5-d1cf-423e-b828-fc8b35b43b12', '2024-01-10 18:42:16.492')
     `);

    // Crear usuarios de conversación
    await queryRunner.query(`
         INSERT INTO conversation_users_user (user_id, conversation_id)
         VALUES
             ('7c1af18f-9c05-4324-829d-949f6d7bd970', '6fbb48e5-d1cf-423e-b828-fc8b35b43b10'),
             ('7c1af18f-9c05-4324-829d-949f6d7bd971', '6fbb48e5-d1cf-423e-b828-fc8b35b43b10'),
             ('7c1af18f-9c05-4324-829d-949f6d7bd971', '6fbb48e5-d1cf-423e-b828-fc8b35b43b11'),
             ('7c1af18f-9c05-4324-829d-949f6d7bd972', '6fbb48e5-d1cf-423e-b828-fc8b35b43b12')
     `);

    // Crear mensajes
    await queryRunner.query(`
         INSERT INTO message (content, type, user_id, conversation_id)
         VALUES
             ('Message 1', 'text', '7c1af18f-9c05-4324-829d-949f6d7bd970', '6fbb48e5-d1cf-423e-b828-fc8b35b43b10'),
             ('Message 2', 'text', '7c1af18f-9c05-4324-829d-949f6d7bd971', '6fbb48e5-d1cf-423e-b828-fc8b35b43b10'),
             ('Message 3', 'text', '7c1af18f-9c05-4324-829d-949f6d7bd971', '6fbb48e5-d1cf-423e-b828-fc8b35b43b11'),
             ('Message 4', 'text', '7c1af18f-9c05-4324-829d-949f6d7bd972', '6fbb48e5-d1cf-423e-b828-fc8b35b43b12')
     `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Eliminar mensajes
    await queryRunner.query(`
            DELETE FROM message
        `);

    // Eliminar usuarios de conversación
    await queryRunner.query(`
            DELETE FROM conversation_users_user
        `);

    // Eliminar conversaciones
    await queryRunner.query(`
            DELETE FROM conversation
        `);

    // Eliminar usuarios
    await queryRunner.query(`
            DELETE FROM "user"
        `);
  }
}
