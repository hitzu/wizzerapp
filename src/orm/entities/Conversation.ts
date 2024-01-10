// conversation.entity.ts

import { Entity, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { User } from './User';
import { Message } from './Message';
import { Base } from './Base';

@Entity()
export class Conversation extends Base {

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];
}
