import type { NextFunction, Request, Response } from 'express';

import type { AuthSevice } from './auth.service';

import { HttpException } from '../../../infrastructure/api/rest/utils/http-exceptions';

export class AuthController {
  constructor(private readonly authService: AuthSevice) {}

  async authorize(req: Request, res: Response, _next: NextFunction) {
    const { body } = req;

    const response = await this.authService.signIn(body);
    if (!response) throw new HttpException('Unauthorized', 401);

    const { expiration = null, parentId, personaId: role, token = '', user = null } = response;

    return res.status(200).send({ expiration, groupId: role, parentId, success: !!token, token, user }).end();
  }

  async testAuthorize(req: Request, res: Response, _next: NextFunction) {
    const token = await this.authService.testSignin();
    return res.status(200).send({ success: true, token }).end();
  }
}
