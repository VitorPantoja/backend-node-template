import type { NextFunction, Request, Response } from 'express';
import { sign, type SignOptions, verify } from 'jsonwebtoken';

import { requestHeaderToken } from './utils';

import { HttpException } from '../../../infrastructure/api/rest/utils/http-exceptions';
import { LogClass } from '../../../infrastructure/server/logger/log-class.decorator';
import type { PayloadTokenDto } from '../../usecases/auth/auth.dto';

export type ExpireOptions = {
  minutes?: number;
  hours?: number;
  days?: number;
};

export interface IJwtConfig {
  secret: string;
  days: number;
  prefix?: string;
  appVersion: string;
}

@LogClass
export class JwtService {
  public readonly prefix: string;

  constructor(private readonly config: IJwtConfig) {
    this.prefix = config?.prefix || '';
    if (!this.config.secret) throw new Error(`JwtService ${this.prefix} missing secret`);
  }

  getExpireDays() {
    return this.config.days;
  }

  async generatePermanent(payload: Partial<PayloadTokenDto>) {
    const { secret } = this.config;
    const token = sign(payload, secret);
    return token;
  }

  async generateToken(payload: Partial<PayloadTokenDto>, expireOptions: ExpireOptions = {}) {
    const arr: Array<[number, string]> = [
      [expireOptions?.minutes ?? 30, `m`],
      [expireOptions?.hours ?? 0, `h`],
      [expireOptions?.days ?? 0, `d`]
    ];
    const found = arr.find(([v]) => !!v);
    const { days, secret } = this.config;

    const expiresIn = found ? `${found[0]}${found[1]}` : `${days}d`;
    const options: SignOptions = {};
    if (expiresIn) options.expiresIn = expiresIn;
    const token = sign({ ...payload, appVersion: this?.config?.appVersion }, secret, options);

    return token;
  }

  verify(token?: string): PayloadTokenDto | null {
    if (!token) return null;
    try {
      const auth = verify(token, this?.config?.secret) as PayloadTokenDto;
      return auth;
    } catch {
      return null;
    }
  }

  async testToken() {
    const payload = {
      name: 'Jimmy',
      scopes: 'customer:read'
    };
    const result = sign(payload, 'minha chave');
    return result;
  }

  createMiddleware(prefix?: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const token = await requestHeaderToken(req);

      if (!token) {
        if (next) return next(new HttpException('Forbidden', 403));
        else throw new HttpException('Forbidden', 403);
      }

      let auth: PayloadTokenDto | null = null;

      try {
        auth = verify(token, this.config.secret) as PayloadTokenDto;
      } catch (error) {
        return next(new HttpException('Invalid token', 401));
      }

      if (!auth && next) return next(new HttpException('Invalid token', 401));
      req.auth = auth;
      return next ? next() : auth;
    };
  }
}
