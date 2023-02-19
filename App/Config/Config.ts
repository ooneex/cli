import { File } from "../deps.ts";
import { AppDirectoryType } from "../Directory/types.ts";
import { ConfigException } from "./ConfigException.ts";
import { AppConfigErrorType, AppConfigType } from "./types.ts";

export class Config {
  private config: AppConfigType | null = null;

  public ensure(): this {
    const file = new File(`${Deno.cwd()}/config/app.config.ts`);
    if (file.exists()) {
      return this;
    }
    const content = `import {
  AppConfigType,
  AppDefaultDirectories,
  NotFoundHandler,
  NotFoundView,
  ServerErrorHandler,
  ServerErrorView
} from "@ooneex/app";

const config: AppConfigType = {
  directories: AppDefaultDirectories,
  errors: {
    notFound: {
      view: NotFoundView,
      handler: NotFoundHandler,
    },
    server: {
      view: ServerErrorView,
      handler: ServerErrorHandler,
    },
  },
};

export default config;
`;
    file.ensure();
    file.write(content);

    return this;
  }

  public async parse(): Promise<this> {
    try {
      this.config = (await import(`@app/config/app.config.ts`)).default;
    } catch (e) {
      throw new ConfigException(
        `${e.message}. Check if "config/app.config.ts" file exists`,
      );
    }

    return this;
  }

  public getDirectories(): AppDirectoryType | null {
    return this.config?.directories ?? null;
  }

  public getErrors(): AppConfigErrorType | null {
    return this.config?.errors ?? null;
  }
}

export const config = new Config();
