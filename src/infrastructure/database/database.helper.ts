import type { DataSourceOptions } from 'typeorm';
import { entities } from './database';
import { env } from '../config/environment';

const options: DataSourceOptions = {
  synchronize: true,
  entities,
  url: env.DATABASE_URL,
  logging: env.LOGGING_DB,
  type: 'postgres'
};

export { options };
