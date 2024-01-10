import GlobalRepository from './GlobalRepository';
import { ConversationUser } from '../entities/ConversationUser';

export class ConversationUserRepository extends GlobalRepository<ConversationUser> {
  constructor() {
    super();
    this.entity = ConversationUser;
  }
}
