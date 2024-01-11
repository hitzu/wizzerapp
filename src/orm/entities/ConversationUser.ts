import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from './Base';
import { User } from './User';
import { Conversation } from './Conversation';

@Entity('conversation_users_user')
export class ConversationUser extends Base {
  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'conversation_id' })
  conversationId: string;

  @ManyToOne(
    () => User,
    user => user.conversationUser
  )
  @JoinColumn({ name: 'user_id' })
  public user?: User;

  @ManyToOne(
    () => Conversation,
    conversation => conversation.conversationUser
  )
  @JoinColumn({ name: 'conversation_id' })
  public conversation?: Conversation;
}
