import {AppApiDirectoryType, AppDirectoryType} from "../Directory/types.ts";
import {ConfigException} from "./ConfigException.ts";
import {AppConfigErrorType, AppConfigType} from "./types.ts";

export class Config {
  private config: AppConfigType | null = null;

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

  public getDirectories(): AppDirectoryType | AppApiDirectoryType | null {
    return this.config?.directories ?? null;
  }

  public getErrors(): AppConfigErrorType | null {
    return this.config?.errors ?? null;
  }
}

export const config = new Config();
