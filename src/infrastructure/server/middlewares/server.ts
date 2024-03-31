import cors from "cors";
import express, { type Express, type Router } from "express";
import useragent from "express-useragent";
import helmet from "helmet";
import http from "http";
import { createHttpTerminator, type HttpTerminator } from "http-terminator";
import morgan from "morgan";

import "reflect-metadata";

import { LogClass } from "../logger/log-class.decorator";

import { createErrorMiddleware } from "./error.middleware";
import { Utils } from "../../../utils";

type NodeEnv = "development" | "production" | "testing";

export interface IAppOptions {
  port: number;
  env: NodeEnv;
}

// @ts-ignore
@LogClass
export class HttpServer {
  private readonly port: number;
  private readonly express: Express;
  private readonly env: NodeEnv;
  private readonly server: http.Server;
  private started: boolean;
  public readonly httpterminator: HttpTerminator;

  constructor(
    { env, port }: IAppOptions,
    private readonly router: Router
  ) {
    this.port = port;
    this.env = env;
    this.express = express();
    this.server = http.createServer(this.express);
    this.httpterminator = createHttpTerminator({ server: this.server });
    this.started = false;
    return this;
  }

  private middlewares() {
    this.express.set("trust proxy", 1);
    this.express.use(helmet({ crossOriginEmbedderPolicy: false }));
    this.express.use(cors({ origin: "*" }));
    this.express.use(useragent.express());
    this.express.use(express.urlencoded({ extended: true, limit: "50mb" }));
    this.express.use(express.json({ limit: "10mb" }));
    this.express.use(morgan("dev"));
  }

  private routes() {
    this.express.use("/api", this.router);
    this.express.use(createErrorMiddleware());
  }

  start() {
    this.middlewares();
    this.routes();
    this.started = true;
    return this;
  }

  public async close() {
    if (this.server.listening) await this.httpterminator.terminate();
    return null;
  }

  async listen() {
    try {
      if (!this.started) this.start();
      return this.server.listen(this.port, () => {
        Utils.TerminalLogger.log(`STARTED SERVER development=${this.env} PORT=${this.port}`, {
          level: "INFO",
          scope: "MAIN"
        });
      });
    } catch {
      Utils.TerminalLogger.log(`Server ERROR`, { level: "ERROR", scope: "MAIN" });
      return undefined;
    }
  }
}
