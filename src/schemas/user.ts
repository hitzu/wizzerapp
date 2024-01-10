import { Joi } from '../services/validation';

export const createUserResquestSchema = Joi.object().keys({
  name: Joi.string().required()
});