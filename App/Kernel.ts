import { App } from "./App.ts";
import { config } from "./Config/Config.ts";
import { AppConfigErrorType } from "./Config/types.ts";
import {
  ConnInfo,
  HttpServer,
  OnServerError,
  OnServerListen,
  ServerHandler,
} from "./deps.ts";
import { AppDirectoryType } from "./Directory/types.ts";
import { env } from "./Env/Env.ts";
import { appRouter } from "./Router/AppRouter.ts";

export class Kernel {
  public static async boot(): Promise<void> {
    await config.parse();
    await env.parse();
    const router = await appRouter.parse();

    const app = new App({
      env,
      directories: config.getDirectories() as AppDirectoryType,
      errors: config.getErrors() as AppConfigErrorType,
      router,
    });

    const server = new HttpServer({
      port: env.getPort() ?? undefined,
      hostname: env.getHost() ?? undefined,
      handler: (request: Request, connInfo: ConnInfo) =>
        ServerHandler(request, app, connInfo),
      onError: (error: unknown) => OnServerError(error, app),
      onListen: (params: { hostname: string; port: number }) =>
        OnServerListen(params.hostname, params.port, app),

      // TODO:
      signal: undefined,
      key: undefined,
      cert: undefined,
      keyFile: undefined,
      certFile: undefined,
    });

    await server.start();
  }
}
