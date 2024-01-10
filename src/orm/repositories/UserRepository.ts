import GlobalRepository from './GlobalRepository';
import { User } from '../entities/User';

export class UserRepository extends GlobalRepository<User> {
  constructor() {
    super();
    this.entity = User;
  }
}
