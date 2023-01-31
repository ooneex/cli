import {
  AppDefaultEnv,
  AppEnvType,
  AppLocaleType,
  AppRoleType,
  AppVersionType,
  ComponentType,
  Handler,
  HttpDefaultProtocols,
  HttpMethodType,
  HttpProtocolType,
  MiddlewareHandler,
  PageProps,
} from "../deps.ts";
import {
  IRoute,
  RouteConstraintsType,
  RouteType,
} from "../types.ts";

export class Route implements IRoute {
  public static DEFAULT_LOCALE: AppLocaleType[] = [];

  constructor(private route: RouteType) {
  }

  public setData<T>(data: Record<string, T> = {}): this {
    this.route.data = data;

    return this;
  }

  public getData<T>(): Record<string, T> | null {
    return (this.route.data as T) ?? null;
  }

  public setDefault(values: Record<string, string> = {}): this {
    this.route.default = values;

    return this;
  }

  public getDefault(): Record<string, string | number> | null {
    return this.route.default ?? null;
  }

  public setFixture(fixture: string | undefined): this {
    this.route.fixture = fixture;

    return this;
  }

  public getFixture(): string | null {
    return this.route.fixture ?? null;
  }

  public setDescription(text: string | undefined): this {
    this.route.description = text;

    return this;
  }

  public getDescription(): string | null {
    return this.route.description ?? null;
  }

  public setEnvs(envs: AppEnvType[] = AppDefaultEnv): this {
    this.route.envs = envs;

    return this;
  }

  public getEnvs(): AppEnvType[] | null {
    return this.route.envs ?? null;
  }

  public setHosts(hosts: string[] = []): this {
    this.route.hosts = hosts;

    return this;
  }

  public getHosts(): string[] | null {
    return this.route.hosts ?? null;
  }

  public setIps(ips: string[] = []): this {
    this.route.ips = ips;

    return this;
  }

  public getIps(): string[] | null {
    return this.route.ips ?? null;
  }

  public setLocales(locales: AppLocaleType[] = Route.DEFAULT_LOCALE): this {
    this.route.locales = locales;

    return this;
  }

  public getLocales(): AppLocaleType[] | null {
    return this.route.locales ?? null;
  }

  public setView(view?: ComponentType<PageProps>): this {
    this.route.view = view;

    return this;
  }

  public getView(): ComponentType<PageProps> | null {
    return this.route.view ?? null;
  }

  public setHandler(handler?: Handler): this {
    this.route.handler = handler;

    return this;
  }

  public getHandler(): Handler | null {
    return this.route.handler ?? null;
  }

  public setMiddleware(middleware?: MiddlewareHandler): this {
    this.route.middleware = middleware;

    return this;
  }

  public getMiddleware(): MiddlewareHandler | null {
    return this.route.middleware ?? null;
  }

  public setConstraints(constraints?: RouteConstraintsType): this {
    this.route.constraints = constraints;

    return this;
  }

  public getConstraints(): RouteConstraintsType | null {
    return this.route.constraints ?? null;
  }

  public setMethods(methods?: HttpMethodType[]): this {
    this.route.methods = methods;

    return this;
  }

  public getMethods(): HttpMethodType[] | null {
    return this.route.methods ?? null;
  }

  public setName(name: string): this | string {
    this.route.name = name;

    return this;
  }

  public getName(): string {
    return this.route.name;
  }

  public setPath(path: string): this {
    this.route.path = path;

    return this;
  }

  public getPath(): string {
    return this.route.path;
  }

  public setPorts(ports: string[] = []): this {
    this.route.ports = ports ?? [];

    return this;
  }

  public getPorts(): string[] | null {
    return this.route.ports ?? null;
  }

  public setProtocols(
    protocols: HttpProtocolType[] = HttpDefaultProtocols,
  ): this {
    this.route.protocols = protocols;

    return this;
  }

  public getProtocols(): HttpProtocolType[] | null {
    return this.route.protocols ?? null;
  }

  public setRoles(roles: AppRoleType[] = []): this {
    this.route.roles = roles;

    return this;
  }

  public getRoles(): AppRoleType[] | null {
    return this.route.roles ?? null;
  }

  public setVersions(versions: AppVersionType[] = []): this {
    this.route.versions = versions;

    return this;
  }

  public getVersions(): AppVersionType[] | null {
    return this.route.versions ?? null;
  }

  // public isEquals(matchedRoute: IMatchedRoute): boolean {
    // const routeChecker = new RouteChecker(this, matchedRoute);

    // return routeChecker.isValid();

    // return true;
  // }
}
