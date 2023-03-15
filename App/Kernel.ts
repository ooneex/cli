import { App } from "./App.ts";
import { config } from "./Config/Config.ts";
import { AppConfigErrorType } from "./Config/types.ts";
import {
  buildIslands,
  ConnInfo,
  HttpServer,
  OnServerError,
  OnServerListen,
  ServerHandler,
  watchIslands
} from "./deps.ts";
import { AppFullDirectoryType } from "./Directory/types.ts";
import { env } from "./Env/Env.ts";
import { appRouter } from "./Router/AppRouter.ts";

export class Kernel {
  public static async boot(abortController: AbortController): Promise<void> {
    await config.parse();
    await env.parse();
    const router = await appRouter.parse();

    const app = new App({
      env,
      directories: config.getDirectories() as AppFullDirectoryType,
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
      signal: abortController.signal,

      // TODO:
      key: undefined,
      cert: undefined,
      keyFile: undefined,
      certFile: undefined,
    });

    if (env.isDev()) {
      await watchIslands();
    }

    if (env.isProd()) {
      await buildIslands();
    }

    await server.start();
  }
}
