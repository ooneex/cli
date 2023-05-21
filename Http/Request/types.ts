import { ReadonlyHeader } from "../Header/mod.ts";
import { AppEnvType, LocaleType, VersionType } from "../deps.ts";
import { HttpMethodType } from "../types.ts";

export interface IRequest {
  readonly url: Readonly<URL> | null;
  readonly header: ReadonlyHeader | null;
  readonly search: Readonly<URLSearchParams> | null;
  readonly id: string;
  readonly native: Request | null;
  getMethod: () => HttpMethodType | null;
  getRouteName: () => string;
  getIp: () => string;
  getLocale: () => LocaleType;
  getEnv: () => AppEnvType;
  getVersion: () => VersionType | null;
  isJson: () => boolean;
  isText: () => boolean;
  isFormData: () => boolean;
  getBody: <T = Record<string, unknown>>() => Promise<
    T | string | FormData | null
  >;
}

export type UrlPatternType = `/${string}`;
