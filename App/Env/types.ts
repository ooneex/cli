import { DotEnvValueType } from "../deps.ts";
import { AppLocaleType } from "../types.ts";

export type AppEnvVarsType = Record<
  | "APP_ENV"
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

export const AppDefaultEnv: AppEnvType[] = [
  "dev",
  "prod",
  "test",
];

export interface IEnv {
  parse(): void;

  getAppEnv(): AppEnvType | null;

  isDev(): boolean;

  isProd(): boolean;

  isTest(): boolean;

  getLocale(): AppLocaleType | null;

  getCountry(): string | null;

  getVersion(): string | null;

  getSecret(): string | null;

  isDebug(): boolean;

  getPort(): number | null;

  get<T>(key: Uppercase<string>): T | undefined;

  getData(): Record<string, DotEnvValueType>;
}
