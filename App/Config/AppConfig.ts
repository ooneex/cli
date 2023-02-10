import { AppDirectoryType } from "../Directory/types.ts";
import { AppConfigErrorType, AppConfigType } from "./types.ts";

export class AppConfig {
  private config: AppConfigType | null = null;

  public async parse(): Promise<void> {
    this.config = (await import(`@app/config/app.config.ts`)).default;
  }

  public getDirectories(): AppDirectoryType | null {
    return this.config?.directories || null;
  }

  public getErrors(): AppConfigErrorType | null {
    return this.config?.errors || null;
  }
}

export const appConfig = new AppConfig();
