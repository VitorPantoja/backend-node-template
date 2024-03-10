import { IndexRoute } from '../../../application/usecases/index.route';
import { env } from '../../config/environment';
import { HttpServer } from '../../server/middlewares/server';

const server = new HttpServer({ port: env.PORT, env: 'development' }, IndexRoute);

export { server };
