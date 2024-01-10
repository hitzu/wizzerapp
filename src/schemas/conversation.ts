import { Joi } from '../services/validation';

export const createConversationResquestSchema = Joi.object().keys({
    userId: Joi.string(),
});

export const joinConversationResquestSchema = Joi.object().keys({
  userId: Joi.string(),
  conversationId: Joi.string(),
});

export const deleteConversationResquestSchema = Joi.object().keys({
  id: Joi.string(),
});