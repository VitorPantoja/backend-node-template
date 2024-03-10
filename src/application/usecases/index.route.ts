import { Router } from 'express';
import { HealthRoute } from './health/health.route';
import { UserRoute } from './user/user.route';

const IndexRoute = Router();

IndexRoute.use('/health', HealthRoute);
IndexRoute.use('/user', UserRoute);

export { IndexRoute };
