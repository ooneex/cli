import { appConfig } from "./Config/AppConfig.ts";
import { env } from "./Env/Env.ts";
import { appRouter } from "./Router/AppRouter.ts";

export class Kernel {
  public static async boot(): Promise<void> {
    env.generateEnvFile();
    await env.parse();

    await appConfig.parse();

    const manifest = await appRouter.parse();

    console.log(manifest);

    // await start(manifest, {...opts, port: env.getPort() || undefined});
  }
}
