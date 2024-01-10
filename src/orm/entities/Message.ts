import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Conversation } from './Conversation';
import { Base } from './Base';

@Entity()
export class Message extends Base {

  @Column({ nullable: true })
  content: string;

  // 'text', 'image', 'video', etc.
  @Column({ type: 'varchar', default: 'text' })
  type: string;

  // For multimedia messages, you might store a URL or other reference.
  @Column({ nullable: true })
  multimediaUrl: string;

  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  @JoinColumn({ name: 'conversation_id' })
  conversation: Conversation;
}
