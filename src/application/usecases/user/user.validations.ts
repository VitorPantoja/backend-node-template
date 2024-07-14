import { celebrate, Joi, Segments } from 'celebrate';

const createUserSchema = celebrate({
  [Segments.BODY]: {
    age: Joi.number().optional(),
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string().required()
  }
});

const deleteUserSchema = celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required()
  }
});

const zodCreateUserSchema = '';

export { createUserSchema, zodCreateUserSchema, deleteUserSchema };
