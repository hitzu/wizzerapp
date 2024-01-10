import Express from 'express';
import {
  createMessage,
} from '../controllers/message.controller';
const api = Express.Router();
import { validateSchema } from '../middlewares/validate-input-schema';
import {
  createMessageResquestSchema,
} from '../schemas/index';

api.post('/', validateSchema(createMessageResquestSchema, 'body'), createMessage);

export default api;