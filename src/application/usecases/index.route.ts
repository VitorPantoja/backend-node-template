import { Router } from "express";

import { authMiddleware, authMiddleware2 } from "./auth/auth.middleware";
import { HealthRoute } from "./health/health.route";
import { UserRoute } from "./user/user.route";
// import { authMiddleware2 } from './auth/auth.middleware';

const IndexRoute = Router();

IndexRoute.use(authMiddleware2);
IndexRoute.use("/health", HealthRoute);
IndexRoute.use("/user", UserRoute);

export { IndexRoute };
