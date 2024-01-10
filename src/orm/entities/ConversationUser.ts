import { Entity, Column } from 'typeorm';
import { Base } from './Base';

@Entity('conversation_users_user')
export class ConversationUser extends Base {

  @Column()
  userId: string;

  @Column()
  conversationId: string;

}
