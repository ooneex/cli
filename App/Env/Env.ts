import { DotEnv } from "../deps.ts";
import { AppLocaleType, AppVersionType } from "../types.ts";
import { AppEnvType, AppEnvVarsType, IEnv } from "./types.ts";

export class Env implements IEnv {
  private dotEnv: DotEnv = new DotEnv();

  public async parse(): Promise<this> {
    await this.dotEnv.parse(".env");
    await this.dotEnv.parse(".env.test");
    await this.dotEnv.parse(".env.prod");
    await this.dotEnv.parse(".env.local");
    await this.dotEnv.parse(".env.test.local");
    await this.dotEnv.parse(".env.prod.local");

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
    return this.get<number>("PORT") ?? null;
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
    return this.dotEnv.get<T>(key);
  }

  public getData(): AppEnvVarsType {
    return this.dotEnv.getData() as AppEnvVarsType;
  }

  public setData(data: AppEnvVarsType): this {
    this.dotEnv.setData(data);

    return this;
  }
}

export const env = new Env();
