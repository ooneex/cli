import { HttpMethodType } from "../deps.ts";

export type RouteConfigType = {
  name: string;
  routeOverride: string;
  methods?: HttpMethodType[];
  csp?: boolean;
};

export type RouteModuleType = {
  default?: unknown;
  handler?: unknown;
  config?: RouteConfigType;
};

export type ManifestType = {
  routes: Record<string, RouteModuleType>;
  islands: Record<string, unknown>;
  baseUrl: string;
  config?: Record<string, unknown>;
};
