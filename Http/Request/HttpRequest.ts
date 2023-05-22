import {
  AppEnvType,
  get,
  getOrNull,
  Helper,
  IRoute,
  LocaleType,
  MatchedRouteParamsType,
  MatchedRouteType,
  VersionType,
} from "../deps.ts";
import { ReadonlyHeader } from "../Header/mod.ts";
import { HttpMethodType } from "../types.ts";
import { RequestBodyParserException } from "./RequestBodyParserException.ts";
import { IRequest, UrlPatternType } from "./types.ts";

export class HttpRequest implements IRequest {
  public readonly url: Readonly<URL> | null;
  public readonly header: ReadonlyHeader | null;
  public readonly search: Readonly<URLSearchParams> | null;
  public readonly id: string = crypto.randomUUID();

  constructor(public readonly native: Request | null = null) {
    this.url = null;
    this.header = null;
    this.search = null;

    if (native) {
      this.url = new URL(native.url);
      // this.url.pathname = decodeURIComponent(this.url.pathname);
      this.header = new ReadonlyHeader(native.headers);
      this.search = this.url.searchParams;
    }
  }

  public getRouteDefinition(): IRoute {
    const K = get<{ Route: { Default: symbol } }>(this.id);

    return get<IRoute>(K.Route.Default);
  }

  public getRouteName(): string {
    const K = get<{ Route: { Matched: symbol } }>(this.id);
    const matchedRoute = get<MatchedRouteType>(K.Route.Matched);

    return matchedRoute.name;
  }

  public getIp(): string {
    const K = get<{ Route: { Matched: symbol } }>(this.id);
    const matchedRoute = get<MatchedRouteType>(K.Route.Matched);

    return matchedRoute.ip;
  }

  public getLocale(): LocaleType {
    const K = get<{ Route: { Matched: symbol } }>(this.id);
    const matchedRoute = get<MatchedRouteType>(K.Route.Matched);

    return matchedRoute.locale;
  }

  public getAppEnv(): AppEnvType {
    const K = get<{ Route: { Matched: symbol } }>(this.id);
    const matchedRoute = get<MatchedRouteType>(K.Route.Matched);

    return matchedRoute.env;
  }

  public getVersion(): VersionType | null {
    const K = get<{ Route: { Matched: symbol } }>(this.id);
    const matchedRoute = get<MatchedRouteType>(K.Route.Matched);

    return matchedRoute.version;
  }

  public getMethod(): HttpMethodType | null {
    if (!this.native) {
      return null;
    }

    return this.native.method as HttpMethodType;
  }

  public isFormData(): boolean {
    if (!this.header) {
      return false;
    }

    return this.header.isFormData();
  }

  public isJson(): boolean {
    if (!this.header) {
      return false;
    }

    return this.header.isJson();
  }

  public isText(): boolean {
    if (!this.header) {
      return false;
    }

    return this.header.isText();
  }

  // TODO: arrayBuffer() blob()
  // TODO: check for bodyUsed
  public async getBody<T = Record<string, unknown>>(): Promise<
    T | string | FormData | null
  > {
    // TODO: check if body is null

    try {
      if (this.native && this.isJson()) {
        return await this.native.json();
      }

      if (this.native && this.isText()) {
        return await this.native.text();
      }

      if (this.native && this.isFormData()) {
        return await this.native.formData();
      }
    } catch (e) {
      throw new RequestBodyParserException(e.message);
    }

    return null;
  }

  /**
   * Check if an url pattern (like /books/:id) matches with this request
   */
  public getParams(
    pattern?: UrlPatternType,
  ): MatchedRouteParamsType {
    if (!pattern) {
      const K = get<{ Route: { Params: symbol } }>(this.id);
      const params = getOrNull<MatchedRouteParamsType>(K.Route.Params);

      return params ?? {};
    }

    if (!this.url) {
      return {};
    }

    const urlPattern = new URLPattern({ pathname: pattern });
    const match = urlPattern.exec(this.url);

    if (!match) {
      return {};
    }

    const params = match.pathname.groups;

    if (Helper.isEmpty(params)) {
      return {};
    }

    return match.pathname.groups ?? {};
  }
}
