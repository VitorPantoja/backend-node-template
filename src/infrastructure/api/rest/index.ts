import { IndexRoute } from '../../../application/usecases/index.route';
import { env } from '../../config/environment';
import { HttpServer } from '../../server/server';

const server = new HttpServer({ env: 'development', port: env.PORT }, IndexRoute);

export { server };
