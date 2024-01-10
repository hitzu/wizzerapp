import { Joi } from '../services/validation';

export const createMessageResquestSchema = Joi.object().keys({
    content: Joi.string().optional(),
    type: Joi.string().optional(),
    multimediaUrl: Joi.string().optional(),
    userId: Joi.string().required(),
    conversationId: Joi.string().required(),
});

export const getMessagesResquestSchema = Joi.object().keys({
  limit: Joi.string().required(),
  page: Joi.string().required(),
  userId: Joi.string().optional(),
  conversationId: Joi.string().optional(),
});

export const getMessageByIdResquestSchema = Joi.object().keys({
  id: Joi.string().required(),
});

export const updateMessageResquestSchema = Joi.object().keys({
  id: Joi.string().required(),
  content: Joi.string().optional(),
  type: Joi.string().optional(),
  multimediaUrl: Joi.string().optional(),
});

export const deleteMessageResquestSchema = Joi.object().keys({
  id: Joi.string(),
});

