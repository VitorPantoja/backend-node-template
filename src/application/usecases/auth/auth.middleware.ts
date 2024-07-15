// import { env } from '@infrastructure/config/environment';
import type { NextFunction, Request } from 'express';
import { verify } from 'jsonwebtoken';

import type { PayloadTokenDto } from './auth.dto';

import { ForbiddenError, UnauthorizedError } from '../../../infrastructure/api/rest/utils/http-exceptions';
import { env } from '../../../infrastructure/config/environment';

export function requestHeaderToken(req: Request) {
  const { body, headers, query } = req;
  const token = headers?.authorization || headers['x-access-token'] || body?.token || query?.token;

  if (!token) return null;
  if (token.startsWith('Bearer ')) return token.slice(7, token.length);

  return token;
}

export function createAuthMiddleware() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = requestHeaderToken(req);
    if (!token) {
      return next(new ForbiddenError('Forbidden'));
    }
    let payload: PayloadTokenDto | null = null;
    try {
      payload = verify(token, env.APP_SECRET) as PayloadTokenDto;
    } catch (error) {
      return next(new UnauthorizedError('Invalid token'));
    }

    if (!payload && next) return next(new UnauthorizedError('invalid_token_2'));

    req.auth = payload;
    return next ? next() : payload;
  };
}
