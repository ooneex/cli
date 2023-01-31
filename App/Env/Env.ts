import { DotEnv, File } from "../deps.ts";
import { AppEnvType, AppEnvVarsType, IEnv } from "./types.ts";
import { AppLocaleType, AppVersionType } from "../types.ts";

export class Env implements IEnv {
  private dotEnv: DotEnv = new DotEnv();

  public generateEnvFile(): void {
    let fileContent = `APP_ENV=dev
LOCALE=en-us
COUNTRY="United States"
VERSION=1.0.0
SECRET=${crypto.randomUUID()}
DEBUG=true
PORT=8080
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
      return;
    }

    localEnvFile.ensure();
    localEnvFile.write(fileContent);
  }

  public async parse(): Promise<void> {
    await this.dotEnv.parse(".env");
    await this.dotEnv.parse(".env.test");
    await this.dotEnv.parse(".env.prod");
    await this.dotEnv.parse(".env.local");
    await this.dotEnv.parse(".env.test.local");
    await this.dotEnv.parse(".env.prod.local");
  }

  public getAppEnv(): AppEnvType | null {
    return this.get<AppEnvType>("APP_ENV") ?? null;
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

  public getLocale(): AppLocaleType | null {
    return this.get<AppLocaleType>("LOCALE") ?? null;
  }

  public getPort(): number | null {
    return this.get<number>("PORT") ?? null;
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

  public get<T>(key: Uppercase<string>): T | undefined {
    return this.dotEnv.get<T>(key);
  }

  public getData(): AppEnvVarsType {
    return this.dotEnv.getData() as AppEnvVarsType;
  }

  public setData(data: AppEnvVarsType): void {
    this.dotEnv.setData(data);
  }
}

export const env = new Env();
