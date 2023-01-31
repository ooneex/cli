import {
  AppEnvType,
  AppLocaleType,
  AppRoleType,
  AppVersionType,
  Collection,
  ComponentType,
  Handler,
  HttpMethodType,
  HttpProtocolType,
  MiddlewareHandler,
  PageProps,
} from "./deps.ts";

import { Route } from "./Route/Route.ts";

export type RouteConstraintValidationType = {
  key: string;
  constraint: RegExp;
  context: string;
};

export type RouteConstraintsType = {
  where?: Record<string, string | number>;
  regex?: Record<string, string>;
  number?: string[];
  alphaNumeric?: string[];
  uuid?: string[];
  in?: Record<string, (string | number)[]>;
};

export type RouteType = {
  /**
   * Name of route
   */
  name: string;
  /**
   * Path schema
   * @example /products/:id /users/:id/edit
   */
  path: string;
  /**
   * Component to render if this route matched
   */
  view?: ComponentType<PageProps>;
  /**
   * Handler to trigger if this route matched
   */
  handler?: Handler;
  /**
   * Middlewares to trigger if this route matched
   */
  // deno-lint-ignore no-explicit-any
  middleware?: MiddlewareHandler<any>;
  /**
   * If Content-Security-Policy should be enabled for this page. If 'true', a
   * locked down policy will be used that allows only the scripts and styles
   * that are generated by fresh. Additional scripts and styles can be added
   * using the `useCSP` hook.
   */
  csp?: boolean;
  /**
   * Allowed methods for this route
   */
  methods?: HttpMethodType[];
  /**
   * Protocol type
   * @example https http
   */
  protocols?: HttpProtocolType[];
  /**
   * Allow hosts for this route
   * @example ["api.ooneex.io"]
   */
  hosts?: string[];
  /**
   * Allow ips for this route
   * @example ["127.0.0.1"]
   */
  ips?: string[];
  /**
   * Port of route
   * @default 80
   * @example 8000
   */
  ports?: string[];
  /**
   * Constraints for route params
   * @example {id: /^[0-9]+$/}
   */
  constraints?: RouteConstraintsType;
  /**
   * Default values for route params
   */
  default?: Record<string, string | number>;
  /**
   * Additional data for this route
   */
  data?: Record<string, unknown>;
  /**
   * Allowed locales for this route
   */
  locales?: AppLocaleType[];
  /**
   * Allowed roles for this route
   */
  roles?: AppRoleType[];
  /**
   * Allowed environment for this route
   * @example ["dev"] ["prod", "dev"] ["test", "demo"]
   */
  envs?: AppEnvType[];
  /**
   * Version of this route
   */
  versions?: AppVersionType[];
  /**
   * Render fixture for this route
   */
  fixture?: string;
  /**
   * Route description. Used for documentation
   */
  description?: string;
};

export interface IRoute {
  getName(): string;

  getPath(): string;

  getProtocols(): HttpProtocolType[] | null;

  getHosts(): string[] | null;

  getIps(): string[] | null;

  getPorts(): string[] | null;

  getDefault(): Record<string, string | number> | null;

  getConstraints(): RouteConstraintsType | null;

  getHandler(): Handler | null;

  getView(): ComponentType<PageProps> | null;

  // deno-lint-ignore no-explicit-any
  getMiddleware(): MiddlewareHandler<any> | null;

  getMethods(): HttpMethodType[] | null;

  getData<T>(): Record<string, T> | null;

  getLocales(): AppLocaleType[] | null;

  getRoles(): AppRoleType[] | null;

  getEnvs(): AppEnvType[] | null;

  getVersions(): AppVersionType[] | null;

  getFixture(): string | null;

  getDescription(): string | null;

  // isEquals(matchedRoute: IMatchedRoute): boolean;
}

export type MatchedRouteParamsType = Record<
  string | number,
  string | number | undefined
>;

export type MatchedRouteType = {
  captures?: string[];
  methods?: HttpMethodType[];
  name?: string;
  path?: string;
  params?: MatchedRouteParamsType;
  method?: HttpMethodType;
  protocol?: HttpProtocolType;
  ip?: string;
  host?: string;
  port?: string;
  locale?: AppLocaleType;
  role?: AppRoleType;
  env?: AppEnvType;
  version?: AppVersionType;
};

export interface IMatchedRoute {
  getCaptures(): string[] | null;

  getMethods(): HttpMethodType[] | null;

  getName(): string | null;

  getPath(): string | null;

  getParams(): MatchedRouteParamsType;

  getMethod(): HttpMethodType | null;

  getProtocol(): HttpProtocolType | null;

  getIp(): string | null;

  getHost(): string | null;

  getPort(): string | null;

  getLocale(): AppLocaleType | null;

  getRole(): AppRoleType | null;

  getEnv(): AppEnvType | null;

  getVersion(): AppVersionType | null;
}

export type RouteCheckerErrorType = {
  key: string;
  message: string;
  context?: string;
  errors?: RouteCheckerErrorType;
}[];

export interface IRouteChecker {
  check(route: IRoute, MatchedRoute: IMatchedRoute): this;

  isValid(): boolean;

  getErrors(): RouteCheckerErrorType;

  checkMethod(): boolean | string;

  checkProtocol(): boolean | string;

  checkHost(): boolean | string;

  checkPort(): boolean | string;

  checkLocale(): boolean | string;

  checkRole(): boolean | string;

  checkEnv(): boolean | string;

  checkVersion(): boolean | string;

  // checkConstraints(): boolean | RouteCheckerErrorType;
}

export interface IRouter {
  count(): number;

  findByName(name: string): IRoute | undefined;

  getCollection(): Collection<string, Route>;
}