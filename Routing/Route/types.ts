import {
  AppEnvType,
  ControllerType,
  HttpMethodType,
  HttpProtocolType,
  LocaleType,
  VersionType,
  z,
} from "../deps.ts";
import { RouteConstraintsSchema, RouteDefinitionSchema } from "./schema.ts";

export type RoutePathType = z.infer<typeof RouteDefinitionSchema.shape.path>;

export type RouteConstraintsType = z.infer<typeof RouteConstraintsSchema>;

export type RouteDefinitionType = {
  /**
   * Name of route
   */
  name: z.infer<typeof RouteDefinitionSchema.shape.name>;
  /**
   * Path schema
   * @see https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API
   * @example /products/:id /users/:id/edit
   */
  path: RoutePathType;
  /**
   * Handler to trigger if this route matched
   */
  controller: ControllerType;

  // TODO: add controller class name

  // TODO: add before and after event as decorator
  /**
   * Allowed methods for this route
   */
  methods?: z.infer<typeof RouteDefinitionSchema.shape.methods>;
  /**
   * Protocol type
   * @example https http
   */
  protocols?: z.infer<typeof RouteDefinitionSchema.shape.protocols>;
  /**
   * Allow hosts for this route
   * @example ["api.ooneex.io"]
   */
  hosts?: z.infer<typeof RouteDefinitionSchema.shape.hosts>;
  /**
   * Allow ips for this route
   * @example ["127.0.0.1"]
   */
  ips?: z.infer<typeof RouteDefinitionSchema.shape.ips>;
  /**
   * Port of route
   * @default 80
   * @example 8000
   */
  ports?: z.infer<typeof RouteDefinitionSchema.shape.ports>;
  /**
   * Constraints for route params
   * @example {id: /^[0-9]+$/}
   */
  constraints?: z.infer<typeof RouteDefinitionSchema.shape.constraints>;
  /**
   * Default values for route params
   */
  default?: z.infer<typeof RouteDefinitionSchema.shape.default>;
  /**
   * Additional data for this route
   */
  data?: z.infer<typeof RouteDefinitionSchema.shape.data>;
  /**
   * Allowed locales for this route
   */
  locales?: z.infer<typeof RouteDefinitionSchema.shape.locales>;
  /**
   * Allowed environment for this route
   * @example ["development"] ["production", "development"] ["testing", "local"]
   */
  envs?: z.infer<typeof RouteDefinitionSchema.shape.envs>;
  /**
   * Version of this route
   */
  versions?: z.infer<typeof RouteDefinitionSchema.shape.versions>;
  /**
   * Route description. Used for documentation
   */
  description?: z.infer<typeof RouteDefinitionSchema.shape.description>;
};

export interface IRoute {
  getName: () => string;
  getPath: () => RoutePathType;
  getProtocols: () => HttpProtocolType[] | null;
  getHosts: () => string[] | null;
  getIps: () => string[] | null;
  getPorts: () => number[] | null;
  getDefault: () => Record<string, string | number> | null;
  getConstraints: () => RouteConstraintsType | null;
  getController: () => ControllerType;
  getMethods: () => HttpMethodType[] | null;
  getData: <T>() => Record<string, T> | null;
  getLocales: () => LocaleType[] | null;
  getEnvs: () => AppEnvType[] | null;
  getVersions: () => VersionType[] | null;
  getDescription: () => string | null;
}
