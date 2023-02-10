import { AppConfigType } from "./Config/types.ts";
import {
  IException,
  IRouter,
  LocaleType,
  MatchedRouteType,
  RouteDefinitionType,
} from "./deps.ts";
import { IEnv } from "./Env/types.ts";

export type AppLocaleType = LocaleType;

export type AppRoleType =
  | "ROLE_GUEST"
  | "ROLE_USER"
  | "ROLE_ADMIN"
  | "ROLE_SUPER_ADMIN"
  | `ROLE_${Uppercase<string>}`;
export type AppVersionType = `${number}.${number}.${number}`;

export type AppStateType = {
  env: IEnv;
  config: AppConfigType;
  router: IRouter;
  routeDefinition?: RouteDefinitionType;
  matchedRoute?: MatchedRouteType;
  error?: IException;
};

export type ViewPropsType<T = Record<string, unknown>> = {
  app: AppStateType;
  data: T;
};
