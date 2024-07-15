import 'dotenv/config';

export type NodeEnv = 'development' | 'production' | 'testing';
type Env = {
  PORT: number;
  APP_SECRET: string;
  DATABASE_URL: string;
  SYNCRONIZE_DB: boolean;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  LOGGING_DB: boolean;
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_NAME: string;
  SALTS_ROUNDS: number;
};
export const env: Env = {
  APP_SECRET: process.env?.APP_SECRET ?? 'a1b2c3d4e5f6',
  DATABASE_HOST: process.env?.DATABASE_HOST ?? 'localhost',
  DATABASE_NAME: process.env?.DATABASE_NAME ?? 'cms',
  DATABASE_PORT: process?.env?.DATABASE_PORT ? +process?.env?.DATABASE_PORT : 5432,
  DATABASE_URL: process.env?.DATABASE_URL ?? '',
  DB_NAME: process.env?.DATABASE_NAME ?? 'cms',
  DB_PASSWORD: process.env?.DATABASE_PASSWORD ?? 'postgres',
  DB_USERNAME: process.env?.DATABASE_USER ?? 'postgres',
  LOGGING_DB: !!process?.env?.LOGGING_DB === true,
  PORT: process?.env?.PORT ? +process?.env?.PORT : 3333,
  SALTS_ROUNDS: process?.env?.SALTS_ROUNDS ? +process?.env?.SALTS_ROUNDS : 10,
  SYNCRONIZE_DB: !!process?.env?.SYNCRONIZE_DB === true
};
