import { celebrate, Joi, Segments } from "celebrate";

import { z } from "zod";

const createUserSchema = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    age: Joi.number().optional()
  }
});

const deleteUserSchema = celebrate({
  [Segments.PARAMS]: {
    id: Joi.number().required()
  }
});

const zodCreateUserSchema = "";

export { createUserSchema, zodCreateUserSchema, deleteUserSchema };
