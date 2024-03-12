import { Joi, Segments, celebrate } from 'celebrate';
import { z } from 'zod';

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

// const zodCreateUserSchema = celebrate({
//   [Segments.BODY]: z.object({
//     name: z.string().min(1),
//     email: z.string().email().min(1),
//     password: z.string(),
//     age: z.number()
//   })
// });

const zodCreateUserSchema = '';

export { createUserSchema, zodCreateUserSchema, deleteUserSchema };
