import { AppConfigErrorType } from "./Config/types.ts";
import {
  Collection,
  IMatchedRoute,
  IRoute,
  IRouter,
  LocaleType
} from "./deps.ts";
import { AppFullDirectoryType } from "./Directory/types.ts";
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
  readonly env: IEnv;
  readonly errors: AppConfigErrorType;
  readonly directories: AppFullDirectoryType;
  readonly router: IRouter;
  readonly abortController: AbortController;
  readonly route?: IRoute;
  readonly matchedRoute?: IMatchedRoute;
};

export interface IApp {
  readonly env: IEnv;
  readonly errors: AppConfigErrorType;
  readonly directories: AppFullDirectoryType;
  readonly router: IRouter;
  readonly route?: IRoute;
  readonly matchedRoute?: IMatchedRoute;
  readonly data: Collection;

  isFullApp: () => boolean;
  isApi: () => boolean;
}
