import { env } from './environment';

import type { IJwtConfig } from '../../application/services/JwtService';

export const jwtConfig: IJwtConfig = {
  appVersion: '1.0.0',
  days: 1,
  secret: env?.APP_SECRET || ''
};
