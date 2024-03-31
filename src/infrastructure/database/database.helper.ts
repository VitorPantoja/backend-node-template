import type { DataSourceOptions } from 'typeorm';

import { env } from '../config/environment';

import { entities } from './database';

const options: DataSourceOptions = {
  synchronize: true,
  entities,
  url: env.DATABASE_URL,
  logging: env.LOGGING_DB,
  type: 'postgres',
};

export { options };
