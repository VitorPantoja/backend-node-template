import { Router } from 'express';

import { authMiddleware } from './auth.middleware';
import { createAuthMiddleware } from './auth/auth.middleware';
import { AuthRoute } from './auth/auth.route';
import { HealthRoute } from './health/health.route';
import { UserRoute } from './user/user.route';
// import { authMiddleware2 } from './auth/auth.middleware';

const IndexRoute = Router();

IndexRoute.use('/auth', AuthRoute);
IndexRoute.use('/health', HealthRoute);
IndexRoute.use('/user', UserRoute);
// @ts-ignore
IndexRoute.use(authMiddleware);
IndexRoute.get('/teste', (_req, res) => res.status(200).send({ message: 'Hello World' }).end());

export { IndexRoute };
