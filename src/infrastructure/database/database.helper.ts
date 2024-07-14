import type { ConnectionOptions, DataSourceOptions } from 'typeorm';

import { entities } from './database';

import { env } from '../config/environment';

const options: DataSourceOptions & ConnectionOptions = {
  entities,
  logging: env.LOGGING_DB,
  synchronize: true,
  type: 'postgres',
  url: env.DATABASE_URL
};

export { options };
