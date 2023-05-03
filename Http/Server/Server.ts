import {
  ConnInfo,
  DotEnvValueType,
  get,
  ICollection,
  Keys,
  serve,
} from "../deps.ts";
import { onServerError } from "./onServerError.ts";
import { onServerListen } from "./onServerListen.ts";
import { serverHandler } from "./serverHandler.ts";
import { ServerOptionsType } from "./types.ts";

export class Server {
  constructor(public readonly config: ServerOptionsType) {
  }

  public async start(): Promise<void> {
    await serve(this.config.handler, {
      ...this.config,
    });
  }

  public static create(): Server {
    const env = get<ICollection<string, DotEnvValueType>>(Keys.Env.Default);
    const port = env.get<number>("PORT") ?? 3000;
    const host = env.get<string>("HOST") ?? "localhost";
    const abortController = get<AbortController>(Keys.AbortController);

    const server = new Server({
      port: port,
      hostname: host,
      handler: (request: Request, connInfo: ConnInfo) =>
        serverHandler(request, connInfo),
      onError: (error: unknown) => onServerError(error),
      onListen: (params: { hostname: string; port: number }) =>
        onServerListen(params.hostname, params.port),
      signal: abortController.signal,

      // TODO: implement these features
      key: undefined,
      cert: undefined,
      keyFile: undefined,
      certFile: undefined,
    });

    return server;
  }
}
