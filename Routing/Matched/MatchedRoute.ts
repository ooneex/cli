import {
  AppEnvType,
  HttpMethodType,
  LocaleType,
  VersionType,
} from "../deps.ts";
import {
  IMatchedRoute,
  MatchedRouteParamsType,
  MatchedRouteType,
} from "./types.ts";

export class MatchedRoute implements IMatchedRoute {
  constructor(private readonly matched: MatchedRouteType) {
  }

  public getName(): string {
    return this.matched.name;
  }

  public getUrl(): URL {
    return this.matched.url;
  }

  public getParams(): MatchedRouteParamsType {
    return this.matched.params ?? {};
  }

  public getMethod(): HttpMethodType | null {
    return this.matched.method;
  }

  public getIp(): string {
    return this.matched.ip;
  }

  public getLocale(): LocaleType {
    return this.matched.locale;
  }

  public getAppEnv(): AppEnvType {
    return this.matched.env;
  }

  public getVersion(): VersionType | null {
    return this.matched.version ?? null;
  }
}
