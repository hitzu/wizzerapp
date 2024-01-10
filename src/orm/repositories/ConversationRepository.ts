import GlobalRepository from './GlobalRepository';
import { Conversation } from '../entities/Conversation';

export class ConversationRepository extends GlobalRepository<Conversation> {
  constructor() {
    super();
    this.entity = Conversation;
  }
}
