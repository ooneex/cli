import {
  AppEnvType,
  AppLocaleType,
  AppVersionType,
  HttpMethodType,
} from "../deps.ts";

export type MatchedRouteParamsType = Record<
  string | number,
  string | number | undefined
>;

export type MatchedRouteType = {
  name: string;
  url: URL;
  params?: MatchedRouteParamsType;
  method: HttpMethodType;
  ip: string;
  locale: AppLocaleType;
  env: AppEnvType;
  version?: AppVersionType;
};

export interface IMatchedRoute {
  getName(): string;
  getUrl(): URL;
  getParams(): MatchedRouteParamsType | null;
  getMethod(): HttpMethodType | null;
  getIp(): string;
  getLocale(): AppLocaleType;
  getEnv(): AppEnvType;
  getVersion(): AppVersionType | null;
}
