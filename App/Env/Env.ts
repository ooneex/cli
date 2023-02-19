import { DotEnv, File } from "../deps.ts";
import { AppLocaleType, AppVersionType } from "../types.ts";
import { AppEnvType, AppEnvVarsType, IEnv } from "./types.ts";

export class Env implements IEnv {
  private dotEnv: DotEnv = new DotEnv();

  public ensure(): this {
    let fileContent = `APP_ENV=dev
API=false
LOCALE=en-us
COUNTRY="United States"
VERSION=1.0.0
SECRET=${crypto.randomUUID()}
DEBUG=true
PORT=3000
HOST=localhost
#SSL=keyFile:certFile
SSL=false
`;
    const file = new File(".env");
    if (file.exists()) {
      fileContent = file.read();
    } else {
      file.ensure();
      file.write(fileContent);
    }
    // Generate .env.local if not exists
    const localEnvFile = new File(".env.local");
    if (localEnvFile.exists()) {
      return this;
    }
    localEnvFile.ensure();
    localEnvFile.write(fileContent);

    return this;
  }

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
