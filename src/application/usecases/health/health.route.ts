import { Router } from "express";

import { HealthController } from "./health.controller";

const HealthRoute = Router();

const controller = new HealthController();

HealthRoute.get("/", (...n) => controller.health(...n));

export { HealthRoute };
