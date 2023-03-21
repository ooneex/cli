import { DotEnv } from "../deps.ts";
import { AppLocaleType, AppVersionType } from "../types.ts";
import { AppEnvType, AppEnvVarsType, IEnv } from "./types.ts";

export class Env implements IEnv {
  private data: DotEnv = new DotEnv();

  public async parse(): Promise<this> {
    await this.data.parse(".env");
    await this.data.parse(".env.test");
    await this.data.parse(".env.prod");
    await this.data.parse(".env.local");
    await this.data.parse(".env.test.local");
    await this.data.parse(".env.prod.local");

    if (!this.data.hasData()) {
      this.data.fromJson({
        APP_ENV: "dev",
        API: true,
        LOCALE: "en-us",
        COUNTRY: "United States",
        VERSION: "1.0.0",
        SECRET: crypto.randomUUID(),
        DEBUG: true,
        PORT: "3000",
        HOST: "localhost",
        SSL: false,
      });
    }

    return this;
  }

  public getAppEnv(): AppEnvType {
    return this.get<AppEnvType>("APP_ENV") ?? "dev";
  }

  public isDev(): boolean {
    return this.getAppEnv() === "dev";
  }

  public isProd(): boolean {
    return this.getAppEnv() === "prod";
  }

  public isTest(): boolean {
    return this.getAppEnv() === "test";
  }

  public getCountry(): string | null {
    return this.get<string>("COUNTRY") ?? null;
  }

  public getLocale(): AppLocaleType {
    return this.get<AppLocaleType>("LOCALE") ?? "en";
  }

  public getPort(): number | null {
    let port: string | number | null = this.get<string>("PORT") ?? null;

    if (port) {
      try {
        port = parseInt(port, 10);
      } catch (_e) {
        port = null;
      }
    }

    return port as number | null;
  }

  public getHost(): string | null {
    return this.get<string>("HOST") ?? null;
  }

  public getSecret(): string | null {
    return this.get<string>("SECRET") ?? null;
  }

  public getVersion(): AppVersionType | null {
    return this.get<AppVersionType>("VERSION") ?? null;
  }

  public isDebug(): boolean {
    return this.get<boolean>("DEBUG") === true;
  }

  public isApi(): boolean {
    return this.get<boolean>("API") === true;
  }

  public isFullApp(): boolean {
    return !this.isApi();
  }

  public getSsl(): string | false {
    return this.get<string | false>("SSL") ?? false;
  }

  public isSsl(): boolean {
    return this.getSsl() !== false;
  }

  public get<T>(key: Uppercase<string>): T | undefined {
    return this.data.get<T>(key);
  }

  public getData(): AppEnvVarsType {
    return this.data.getData() as AppEnvVarsType;
  }

  public setData(data: AppEnvVarsType): this {
    this.data.setData(data);

    return this;
  }
}

export const env = new Env();
