import {
  ControllerType,
  HttpMethodType,
  HttpProtocolType,
  LocaleType,
} from "../deps.ts";
import { EnvType, VersionType } from "../types.ts";

export type MiddlewareType = () => void;

export type RoutePathType = `/${string}`;

export type RouteConstraintsType = {
  where?: Record<string, string | number>;
  regex?: Record<string, string>;
  number?: string[];
  alphaNumeric?: string[];
  in?: Record<string, (string | number)[]>;
};

export type RouteDefinitionType = {
  /**
   * Name of route
   */
  name: string;
  /**
   * Path schema
   * @example /products/:id /users/:id/edit
   */
  path: RoutePathType;
  /**
   * Handler to trigger if this route matched
   */
  controller: ControllerType;
  /**
   * Middlewares to trigger if this route matched
   */
  middlewares?: MiddlewareType[];
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
  locales?: LocaleType[];
  /**
   * Allowed environment for this route
   * @example ["dev"] ["prod", "dev"] ["test", "demo"]
   */
  envs?: EnvType[];
  /**
   * Version of this route
   */
  versions?: VersionType[];
  /**
   * Route description. Used for documentation
   */
  description?: string;
};

export interface IRoute {
  getName: () => string;
  getPath: () => RoutePathType;
  getProtocols: () => HttpProtocolType[] | null;
  getHosts: () => string[] | null;
  getIps: () => string[] | null;
  getPorts: () => string[] | null;
  getDefault: () => Record<string, string | number> | null;
  getConstraints: () => RouteConstraintsType | null;
  getController: () => ControllerType;
  getMiddlewares: () => MiddlewareType[] | null;
  getMethods: () => HttpMethodType[] | null;
  getData: <T>() => Record<string, T> | null;
  getLocales: () => LocaleType[] | null;
  getEnvs: () => EnvType[] | null;
  getVersions: () => VersionType[] | null;
  getDescription: () => string | null;
}
