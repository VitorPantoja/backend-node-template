import type { NextFunction, Request } from 'express';
import { sign, verify } from 'jsonwebtoken';

import type { PayloadTokenDto } from '../../domain/dto/jwt.dto';
import { HttpException } from '../../infrastructure/server/middlewares/http-exception';

type JwtConfig = {
  secret: string;
  expiresIn: string;
};

export class JwtService {
  constructor(private readonly jwtConfig: JwtConfig) {}

  async sign() {
    return 'sign';
  }
  //FIX ME: melhorar
  async genereateToken(payload: PayloadTokenDto, time: 'd' | 'm' | 'y' = 'd', quantity: number = 1) {
    let expiresIn = '';
    switch (time) {
      case 'd':
        expiresIn = `${quantity}d`;
        break;
      case 'm':
        expiresIn = `${quantity}m`;
        break;
      case 'y':
        expiresIn = `${quantity}y`;
        break;
      default:
        expiresIn = `${quantity}d`;
        break;
    }
    const token = sign({ ...payload }, this.jwtConfig.secret, { expiresIn });
    return token;
  }

  async verify() {}

  // authMiddleware() {
  //   return async (req: Request, res: Response, next: NextFunction) => {
  //     const { headers } = req;
  //     const token = headers['authorization'];
  //     if (!token) {
  //       return next(new HttpException(403, 'Forbidden'));
  //     }
  //     let payload: PayloadTokenDto | null = null;
  //     try {
  //       payload = verify(token, this.jwtConfig.secret) as PayloadTokenDto;
  //     } catch (error) {
  //       return next(new HttpException(401, 'Invalid token'));
  //     }

  //     if (payload) {
  //       req.token = payload;
  //       return next ? next() : payload;
  //     }
  //   };
  // }
}
