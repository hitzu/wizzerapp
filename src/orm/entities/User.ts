import { Entity, Column, OneToMany } from 'typeorm';
import { Message } from './Message';
import { Base } from './Base';
import { ConversationUser } from './ConversationUser';

@Entity()
export class User extends Base {
  @Column()
  name: string;

  @OneToMany(
    () => Message,
    message => message.user
  )
  messages?: Message[];

  @OneToMany(
    () => ConversationUser,
    conversationUser => conversationUser.user
  )
  public conversationUser?: ConversationUser[];
}
