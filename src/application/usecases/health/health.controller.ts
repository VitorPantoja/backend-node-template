import type { NextFunction, Request, Response } from "express";

import { LogClass } from "../../../infrastructure/server/logger/log-class.decorator";

@LogClass
export class HealthController {
  constructor() {}

  async health(req: Request, res: Response, _next: NextFunction) {
    return res.status(200).json({ status: "UP" });
  }
}
