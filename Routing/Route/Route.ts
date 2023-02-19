import {
  AppEnvType,
  AppLocaleType,
  AppVersionType,
  HandlerType,
  HttpMethodType,
  HttpProtocolType,
  MiddlewareType,
  ViewType,
} from "../deps.ts";

import { IRoute, RouteConstraintsType, RouteDefinitionType } from "./types.ts";

export class Route implements IRoute {
  constructor(private readonly definition: RouteDefinitionType) {
  }

  public getData<T>(): Record<string, T> | null {
    return (this.definition.data as T) ?? null;
  }

  public getDefault(): Record<string, string | number> | null {
    return this.definition.default ?? null;
  }

  public getFixture(): string | null {
    return this.definition.fixture ?? null;
  }

  public getDescription(): string | null {
    return this.definition.description ?? null;
  }

  public getEnvs(): AppEnvType[] | null {
    return this.definition.envs ?? null;
  }

  public getHosts(): string[] | null {
    return this.definition.hosts ?? null;
  }

  public getIps(): string[] | null {
    return this.definition.ips ?? null;
  }

  public getLocales(): AppLocaleType[] | null {
    return this.definition.locales ?? null;
  }

  public getView(): ViewType | null {
    return this.definition.view ?? null;
  }

  public getHandler(): HandlerType {
    return this.definition.handler;
  }

  public getMiddlewares(): MiddlewareType[] | null {
    return this.definition.middlewares ?? null;
  }

  public getConstraints(): RouteConstraintsType | null {
    return this.definition.constraints ?? null;
  }

  public getMethods(): HttpMethodType[] | null {
    return this.definition.methods ?? null;
  }

  public getName(): string {
    return this.definition.name;
  }

  public getPath(): string {
    return this.definition.path;
  }

  public getPorts(): string[] | null {
    return this.definition.ports ?? null;
  }

  public getProtocols(): HttpProtocolType[] | null {
    return this.definition.protocols ?? null;
  }

  public getVersions(): AppVersionType[] | null {
    return this.definition.versions ?? null;
  }
}
