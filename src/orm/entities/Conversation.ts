import { Entity, OneToMany } from 'typeorm';
import { Message } from './Message';
import { Base } from './Base';
import { ConversationUser } from './ConversationUser';

@Entity()
export class Conversation extends Base {
  @OneToMany(
    () => ConversationUser,
    conversationUser => conversationUser.conversation
  )
  public conversationUser?: ConversationUser[];

  @OneToMany(
    () => Message,
    message => message.conversation
  )
  messages?: Message[];
}
