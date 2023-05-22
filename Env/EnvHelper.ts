import {
  AppEnvType,
  get,
  ICollection,
  Keys,
  LocaleType,
  VersionType,
} from "./deps.ts";
import { DotEnvValueType } from "./types.ts";

export class EnvHelper {
  private env: ICollection<string, DotEnvValueType>;
  constructor() {
    this.env = get<ICollection<string, DotEnvValueType>>(Keys.Env.Default);
  }

  public getAppEnv(): AppEnvType {
    return this.env.get<AppEnvType>("APP_ENV") as AppEnvType;
  }

  public isDevelopment(): boolean {
    return this.getAppEnv() === "development";
  }

  public isLocal(): boolean {
    return this.getAppEnv() === "local";
  }

  public isProduction(): boolean {
    return this.getAppEnv() === "production";
  }

  public isTesting(): boolean {
    return this.getAppEnv() === "testing";
  }

  public isStaging(): boolean {
    return this.getAppEnv() === "staging";
  }

  public getLocale(): LocaleType {
    return this.env.get<LocaleType>("LOCALE") as LocaleType;
  }

  public getCountry(): string | null {
    return this.env.get<string>("COUNTRY") ?? null;
  }

  public getVersion(): VersionType {
    return this.env.get<VersionType>("VERSION") as VersionType;
  }

  public getSecret(): string {
    return this.env.get<string>("SECRET") as string;
  }

  public isDebug(): boolean {
    return this.env.get<boolean>("DEBUG") as boolean;
  }

  public getPort(): number {
    return this.env.get<number>("PORT") as number;
  }

  public getHost(): string {
    return this.env.get<string>("HOST") as string;
  }

  public getCharset(): string {
    return this.env.get<string>("CHARSET") as string;
  }
}
