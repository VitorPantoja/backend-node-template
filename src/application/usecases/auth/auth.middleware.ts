// import { env } from '@infrastructure/config/environment';
import type { NextFunction, Request } from "express";
import { verify } from "jsonwebtoken";

import type { PayloadTokenDto } from "../../../domain/dto/jwt.dto";
import { env } from "../../../infrastructure/config/environment";
import { HttpException } from "../../../infrastructure/server/middlewares/http-exception";

export async function authMiddleware2() {
  return async (req: Request, next: NextFunction) => {
    const { headers } = req;
    const token = headers["authorization"];
    if (!token) {
      return next(new HttpException(403, "Forbidden"));
    }
    let payload: PayloadTokenDto | null = null;

    try {
      payload = verify(token, env.APP_SECRET) as PayloadTokenDto;
    } catch (error) {
      return next(new HttpException(401, "Invalid token"));
    }

    if (payload) {
      req.token = payload;
      return next ? next() : payload;
    }
  };
}

export function requestHeaderToken(req: Request) {
  const { body, headers, query } = req;
  const token = headers?.authorization || headers["x-access-token"] || body?.token || query?.token;

  if (!token) return null;
  if (token.startsWith("Bearer ")) return token.slice(7, token.length);

  return token;
}

export function authMiddleware() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { headers } = req;
    const token = headers["authorization"];
    if (!token) {
      return next(new HttpException(403, "Forbidden"));
    }
    let payload: PayloadTokenDto | null = null;
    try {
      payload = verify(token, env.APP_SECRET) as PayloadTokenDto;
    } catch (error) {
      return next(new HttpException(401, "Invalid token"));
    }

    if (!payload && next) return next(new HttpException(401, "invalid_token_2"));

    req.token = payload;
    return next ? next() : payload;
  };
}
