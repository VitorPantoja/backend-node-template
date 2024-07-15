import { createAuthMiddleware } from './auth/auth.middleware';

const authMiddleware = createAuthMiddleware();

export { authMiddleware };
