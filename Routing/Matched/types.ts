import {
  AppEnvType,
  HttpMethodType,
  LocaleType,
  VersionType,
} from "../deps.ts";

export type MatchedRouteParamsType = Record<
  string | number,
  string | number | undefined
>;

export type MatchedRouteType = {
  name: string;
  url: URL;
  params: MatchedRouteParamsType;
  method: HttpMethodType;
  ip: string;
  locale: LocaleType;
  env: AppEnvType;
  version: VersionType | null;
};

export interface IMatchedRoute {
  getName(): string;
  getUrl(): URL;
  getParams(): MatchedRouteParamsType;
  getMethod(): HttpMethodType | null;
  getIp(): string;
  getLocale(): LocaleType;
  getAppEnv(): AppEnvType;
  getVersion(): VersionType | null;
}
