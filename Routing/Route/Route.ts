import {
  AppEnvType,
  ControllerType,
  HttpMethodType,
  HttpProtocolType,
  LocaleType,
  VersionType,
} from "../deps.ts";
import {
  IRoute,
  RouteConstraintsType,
  RouteDefinitionType,
  RoutePathType,
} from "./types.ts";

export class Route implements IRoute {
  constructor(private readonly definition: RouteDefinitionType) {
  }

  public getData<T>(): Record<string, T> | null {
    return this.definition.data as Record<string, T> ?? null;
  }

  public getDefault(): Record<string, string | number> | null {
    return this.definition.default ?? null;
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

  public getLocales(): LocaleType[] | null {
    return this.definition.locales ?? null;
  }

  public getController(): ControllerType {
    return this.definition.controller;
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

  public getPath(): RoutePathType {
    return this.definition.path;
  }

  public getPorts(): number[] | null {
    return this.definition.ports ?? null;
  }

  public getProtocols(): HttpProtocolType[] | null {
    return this.definition.protocols ?? null;
  }

  public getVersions(): VersionType[] | null {
    return this.definition.versions ?? null;
  }
}
