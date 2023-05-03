import { EnvType, get, ICollection, Keys, LocaleType } from "./deps.ts";
import { DotEnvValueType } from "./types.ts";

export class EnvHelper {
  private env: ICollection<string, DotEnvValueType>;
  constructor() {
    this.env = get<ICollection<string, DotEnvValueType>>(Keys.Env.Default);
  }

  public getAppEnv(): EnvType | null {
    return this.env.get<string>("APP_ENV") ?? null;
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

  public getLocale(): LocaleType | null {
    return this.env.get<LocaleType>("LOCALE") ?? null;
  }

  public getCountry(): string | null {
    return this.env.get<string>("COUNTRY") ?? null;
  }

  public getVersion(): string | null {
    return this.env.get<string>("VERSION") ?? null;
  }

  public getSecret(): string | null {
    return this.env.get<string>("SECRET") ?? null;
  }

  public isDebug(): boolean {
    return this.env.get<boolean>("DEBUG") ?? false;
  }

  public getPort(): number | null {
    return this.env.get<number>("PORT") ?? null;
  }

  public getHost(): string | null {
    return this.env.get<string>("HOST") ?? null;
  }
}
