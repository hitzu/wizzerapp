import { Joi } from '../services/validation';

export const createMessageResquestSchema = Joi.object().keys({
    content: Joi.string().optional(),
    type: Joi.string().optional(),
    multimediaUrl: Joi.string().optional(),
    userId: Joi.string().required(),
    conversationId: Joi.string().required(),
  });
