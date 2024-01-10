import Express from 'express';
import {
  createMessage,
  getAllMessages,
  updateMessage,
  deleteMessage,
  getMessageById
} from '../controllers/message.controller';
const api = Express.Router();
import { validateSchema } from '../middlewares/validate-input-schema';
import {
  createMessageResquestSchema,
  getMessagesResquestSchema,
  updateMessageResquestSchema,
  deleteMessageResquestSchema,
  getMessageByIdResquestSchema,
} from '../schemas/index';

api.post('/', validateSchema(createMessageResquestSchema, 'body'), createMessage);
api.get('/', validateSchema(getMessagesResquestSchema, 'query'), getAllMessages);
api.get('/:id', validateSchema(getMessageByIdResquestSchema, 'params'), getMessageById);
api.patch('/', validateSchema(updateMessageResquestSchema, 'body'), updateMessage);
api.delete('/', validateSchema(deleteMessageResquestSchema, 'body'), deleteMessage);

export default api;