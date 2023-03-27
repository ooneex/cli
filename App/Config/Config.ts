import { NotFoundHandler, ServerErrorHandler } from "../deps.ts";
import { AppFullDirectories } from "../Directory/AppDirectory.ts";
import {
  AppApiDirectoryType,
  AppFullDirectoryType,
} from "../Directory/types.ts";
import { AppConfigErrorType, AppConfigType } from "./types.ts";

export class Config {
  private config: AppConfigType | null = null;

  public async parse(): Promise<this> {
    try {
      this.config =
        (await import(`${Deno.cwd()}/config/app.config.ts`)).default;
    } catch (_e) {
      this.config = {
        directories: AppFullDirectories,
        errors: {
          notFound: {
            view: "Exception/NotFoundView",
            handler: NotFoundHandler,
          },
          server: {
            view: "Exception/ServerErrorView",
            handler: ServerErrorHandler,
          },
        },
      };
    }

    return this;
  }

  public getDirectories(): AppFullDirectoryType | AppApiDirectoryType | null {
    return this.config?.directories ?? null;
  }

  public getErrors(): AppConfigErrorType | null {
    return this.config?.errors ?? null;
  }
}

export const config = new Config();
