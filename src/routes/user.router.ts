import Express from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserConversationsWithMessages
} from '../controllers/user.controller';
const api = Express.Router();
import { validateSchema } from '../middlewares/validate-input-schema';
import {
  createUserResquestSchema,
  getUserByIdResquestSchema,
  updateUserResquestSchema,
  deleteUserResquestSchema,
  getUserConversationsWithMessagesResquestSchema,
} from '../schemas/index';

api.get('/', getUsers);
api.get('/:id/conversations', validateSchema(getUserConversationsWithMessagesResquestSchema, 'params'), getUserConversationsWithMessages);
api.get('/:id', validateSchema(getUserByIdResquestSchema, 'params'), getUserById);
api.post('/', validateSchema(createUserResquestSchema, 'body'), createUser);
api.patch('/', validateSchema(updateUserResquestSchema, 'body'), updateUser);
api.delete('/', validateSchema(deleteUserResquestSchema, 'body'), deleteUser);

export default api;