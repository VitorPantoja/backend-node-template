import dotenv, { type DotenvConfigOptions } from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';

type LoadEnvironmentParams = {
  ambient?: NodeJS.ProcessEnv['NODE_ENV'];
};

type Env = {
  [key in keyof NodeJS.ProcessEnv]: NodeJS.ProcessEnv[key];
};

export default class Environment {
  private static _instance: Environment;
  private _env: Env | null = null;

  public static get instance() {
    if (!Environment._instance) {
      Environment._instance = new Environment();
    }

    return Environment._instance;
  }

  get env() {
    return this._env;
  }

  public async load(params?: LoadEnvironmentParams) {
    const dotenvConfigOptions: DotenvConfigOptions = {};

    if (params?.ambient) {
      dotenvConfigOptions.path = path.resolve(process.cwd(), `.env.${params?.ambient}`);
    }

    const dotenvResult = dotenv.config(dotenvConfigOptions);

    if (dotenvResult.error) {
      throw dotenvResult.error;
    }

    if (!dotenvResult.parsed) {
      throw new Error(`Adicione um arquivo '.env' na raiz do projeto. Verifique o arquivo '.env.exemple'`);
    }

    this.verifyEnvironments(dotenvResult.parsed);

    this._env = dotenvResult.parsed as unknown as Env;
  }

  verifyEnvironments(parsedEnvironments: { [name: string]: string } | undefined) {
    if (!parsedEnvironments) {
      throw new Error('Nenhuma variável de ambiente encontrada.');
    }

    const environments = Object.keys(parsedEnvironments);

    const pathEnvExemple = path.resolve('.env.exemple');

    const envExemple = dotenv.parse(fs.readFileSync(pathEnvExemple));

    const environmentsRequired = Object.keys(envExemple);

    for (const environmentRequired of environmentsRequired) {
      if (!environments.find(environment => environment === environmentRequired)) {
        throw new Error(
          `Variável de ambiente '${environmentRequired}' não encontrada. Verifique o arquivo '.env.exemple'`,
        );
      }
    }
  }
}
