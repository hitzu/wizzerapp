import Express from 'express';
import { createUser, swCreateUserFunction } from '../controllers/user.controller';
const api = Express.Router();
import { validateSchema } from '../middlewares/validate-input-schema';
import { createUserResquestSchema } from '../schemas/index';

export const swUserRouter = {
  '/users/': {
    post: {
      ...swCreateUserFunction
    }
  }
};

api.post('/', validateSchema(createUserResquestSchema, 'body'), createUser);

export default api;