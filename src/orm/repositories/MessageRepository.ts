import GlobalRepository from './GlobalRepository';
import { Message } from '../entities/Message';

export class MessageRepository extends GlobalRepository<Message> {
  constructor() {
    super();
    this.entity = Message;
  }
}
