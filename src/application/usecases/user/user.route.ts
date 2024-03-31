import { Router } from "express";

import { userRepository } from "../../../domain/repositories";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { createUserSchema, deleteUserSchema, zodCreateUserSchema } from "./user.validations";

const UserRoute = Router();

const userService = new UserService(userRepository);

const controller = new UserController(userService);

UserRoute.post("/", createUserSchema, (...n) => controller.create(...n));
UserRoute.get("/", (...n) => controller.findAll(...n));
// UserRoute.get('/:id', (...n) => controller.findOne(...n));
// UserRoute.patch('/:id', createUserSchema, (...n) => controller.update(...n));
UserRoute.delete("/:id", deleteUserSchema, (...n) => controller.delete(...n));

export { UserRoute };
