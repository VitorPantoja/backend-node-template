import { Router } from 'express';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userRepository } from '../../../domain/repositories';

const UserRoute = Router();

const userService = new UserService(userRepository);

const controller = new UserController(userService);

UserRoute.post('/', (...n) => controller.create(...n));
UserRoute.get('/', (...n) => controller.findAll(...n));

export { UserRoute };
