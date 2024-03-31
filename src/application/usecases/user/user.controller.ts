import type { NextFunction, Request, Response } from "express";

import type { UserDto } from "../../../domain/dto/user.dto";
import { LogClass } from "../../../infrastructure/server/logger/log-class.decorator";

import type { UserService } from "./user.service";

@LogClass
export class UserController {
  constructor(private readonly userService: UserService) {}

  async create(req: Request<any, any, UserDto>, res: Response, _next: NextFunction) {
    const { body } = req;
    this.userService.create(body);
    return res.status(200).send({ body, success: true });
  }

  async findAll(req: Request, res: Response, _next: NextFunction) {
    const users = await this.userService.findAll();
    return res.status(200).send({ users, success: true });
  }

  async delete(req: Request<any, any, any, any>, res: Response, _next: NextFunction) {
    const { params } = req;
    const result = await this.userService.delete(params.id);
    return res.status(200).send({ id: params.id, result, success: true });
  }
}
