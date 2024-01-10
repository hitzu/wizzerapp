import { Joi } from '../services/validation';

export const createUserResquestSchema = Joi.object().keys({
  name: Joi.string().required()
});

export const getUserByIdResquestSchema = Joi.object().keys({
  id: Joi.string().required()
});

export const updateUserResquestSchema = Joi.object().keys({
  id: Joi.string().required(),
  name: Joi.string().optional()
});

export const deleteUserResquestSchema = Joi.object().keys({
  id: Joi.string().required()
});

