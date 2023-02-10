import { DotEnvValueType } from "../deps.ts";
import { AppLocaleType, AppVersionType } from "../types.ts";

export type AppEnvVarsType = Record<
  | "APP_ENV"
  | "API"
  | "LOCALE"
  | "COUNTRY"
  | "VERSION"
  | "SECRET"
  | "DEBUG"
  | "PORT"
  | `${Uppercase<string>}`,
  DotEnvValueType
>;

export type AppEnvType =
  | "dev"
  | "prod"
  | "test"
  | string;

export interface IEnv {
  getAppEnv(): AppEnvType;

  isApi(): boolean;

  isDev(): boolean;

  isProd(): boolean;

  isTest(): boolean;

  getLocale(): AppLocaleType;

  getCountry(): string | null;

  getVersion(): AppVersionType | null;

  getSecret(): string | null;

  isDebug(): boolean;

  getPort(): number | null;

  get<T>(key: Uppercase<string>): T | undefined;

  getData(): Record<string, DotEnvValueType>;
}
