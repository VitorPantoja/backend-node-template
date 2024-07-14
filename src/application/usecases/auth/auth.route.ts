import { Router } from 'express';

import { AuthController } from './auth.controller';
import { AuthSevice } from './auth.service';

import { userRepository } from '../../../domain/repositories';
import { jwtConfig } from '../../../infrastructure/config/auth';
import { JwtService } from '../../services/JwtService';

/** - {url}/auth */
const AuthRoute = Router();

const jwtService = new JwtService({ ...jwtConfig, prefix: 'default' });

const authService = new AuthSevice(userRepository, jwtService);

const controller = new AuthController(authService);

// rotas publicas
// AuthRoute.post('/', postAuthSchema, authRateLimiter(), (...n) => controller.authorize(...n)); // VOU IMPLEMENTAR TUDO DAQUI PRA BAIXO
AuthRoute.post('/', (...n) => controller.authorize(...n)); // VOU IMPLEMENTAR TUDO DAQUI PRA BAIXO

export { AuthRoute, authService };
