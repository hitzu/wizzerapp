import Express from 'express';
import {
  createConversation,
  joinUserConversation,
  deleteConversation,
} from '../controllers/conversation.controller';
const api = Express.Router();
import { validateSchema } from '../middlewares/validate-input-schema';
import {
  createConversationResquestSchema,
  joinConversationResquestSchema,
  deleteConversationResquestSchema,
} from '../schemas/index';

api.post('/', validateSchema(createConversationResquestSchema, 'body'), createConversation);
api.post('/join', validateSchema(joinConversationResquestSchema, 'body'), joinUserConversation);
api.delete('/', validateSchema(deleteConversationResquestSchema, 'body'), deleteConversation);

export default api;