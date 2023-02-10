import { app } from "./App.ts";
import { appConfig } from "./Config/AppConfig.ts";
import { AppConfigErrorType } from "./Config/types.ts";
import {Manifest, OoneexFreshPlugin, start} from "./deps.ts";
import { AppDirectoryType } from "./Directory/types.ts";
import { env } from "./Env/Env.ts";
import { appRouter } from "./Router/AppRouter.ts";
import { AppStateType } from "./types.ts";

export class Kernel {
  public static async boot(): Promise<void> {
    // TODO: Use try and catch
    env.generateEnvFile();
    await env.parse();
    await appConfig.parse();
    const manifest = await appRouter.parse();
    // End of try and catch

    const state: AppStateType = {
      env: env,
      config: {
        directories: appConfig.getDirectories() as AppDirectoryType,
        errors: appConfig.getErrors() as AppConfigErrorType,
      },
      router: appRouter.getRouter(),
    };

    app.setState(state);

    await start(manifest as Manifest, {
      port: env.getPort() || undefined,
      experimentalDenoServe: true,
      plugins: [],
    });
  }
}
