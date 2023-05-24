import { ConnInfo, EnvHelper, File, get, IFile, Keys, serve } from "../deps.ts";
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
    const envHelper = get<EnvHelper>(Keys.Env.Helper);
    const port = envHelper.getPort();
    const host = envHelper.getHost();
    const abortController = get<AbortController>(Keys.AbortController);

    let tlsKeyFile: IFile | undefined = undefined;
    let tlsCertFile: IFile | undefined = undefined;

    if (envHelper.isSecure()) {
      tlsKeyFile = new File(envHelper.getTlsKey() as string);
      tlsCertFile = new File(envHelper.getTlsCert() as string);
    }

    const server = new Server({
      port: port,
      hostname: host,
      handler: (request: Request, connInfo: ConnInfo) =>
        serverHandler(request, connInfo),
      onError: (error: unknown) => onServerError(error),
      onListen: (params: { hostname: string; port: number }) =>
        onServerListen(params.hostname, params.port),
      signal: abortController.signal,

      key: tlsKeyFile ? tlsKeyFile.read() : tlsKeyFile,
      cert: tlsCertFile ? tlsCertFile.read() : tlsCertFile,
      keyFile: undefined,
      certFile: undefined,
    });

    return server;
  }
}
