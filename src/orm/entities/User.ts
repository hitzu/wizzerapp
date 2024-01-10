import { Entity, Column, OneToMany } from 'typeorm';
import { Message } from './Message';
import { Conversation } from './Conversation';
import { Base } from './Base';

@Entity()
export class User extends Base {

  @Column()
  name: string;

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @OneToMany(() => Conversation, (conversation) => conversation.users)
  conversations: Conversation[];
}