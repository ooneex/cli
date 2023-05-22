import { ReadonlyHeader } from "../Header/mod.ts";
import {
  AppEnvType,
  IRoute,
  LocaleType,
  MatchedRouteParamsType,
  VersionType,
} from "../deps.ts";
import { HttpMethodType } from "../types.ts";

export interface IRequest {
  readonly id: string;
  readonly url: Readonly<URL> | null;
  readonly header: ReadonlyHeader | null;
  readonly search: Readonly<URLSearchParams> | null;
  readonly native: Request | null;
  getMethod: () => HttpMethodType | null;
  getRouteName: () => string;
  getRouteDefinition: () => IRoute;
  getIp: () => string;
  getLocale: () => LocaleType;
  getAppEnv: () => AppEnvType;
  getVersion: () => VersionType | null;
  isJson: () => boolean;
  isText: () => boolean;
  isFormData: () => boolean;
  getBody: <T = Record<string, unknown>>() => Promise<
    T | string | FormData | null
  >;
  getParams: (
    pattern?: UrlPatternType,
  ) => MatchedRouteParamsType;
}

export type UrlPatternType = `/${string}`;
