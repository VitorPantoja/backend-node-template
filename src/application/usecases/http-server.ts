import type { DataSourceService } from "../../infrastructure/datasource";
import type { HttpServer } from "../../infrastructure/server/middlewares/server";
import { Utils } from "../../utils";

export async function startServer(httpServer: HttpServer, dataSource: DataSourceService) {
  const connection = await dataSource.initialize();
  if (connection.isInitialized) {
    const result = {
      httpServer,
      dataSource,
      server: await httpServer.listen()
    };

    return result;
  }
  Utils.TerminalLogger.logError("Server failed to start", { level: "ERROR", scope: "DATABASE" });
  return null;
}
