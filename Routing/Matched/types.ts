import { HttpMethodType, LocaleType } from "../deps.ts";
import { EnvType, VersionType } from "../types.ts";

export type MatchedRouteParamsType = Record<
  string | number,
  string | number | undefined
>;

export type MatchedRouteType = {
  name: string;
  url: URL;
  params?: MatchedRouteParamsType | null;
  method: HttpMethodType;
  ip: string;
  locale: LocaleType;
  env: EnvType;
  version?: VersionType | null;
};

export interface IMatchedRoute {
  getName(): string;
  getUrl(): URL;
  getParams(): MatchedRouteParamsType | null;
  getMethod(): HttpMethodType | null;
  getIp(): string;
  getLocale(): LocaleType;
  getEnv(): EnvType;
  getVersion(): VersionType | null;
}
