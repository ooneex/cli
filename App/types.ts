import { LocaleType } from "./deps.ts";

export type AppLocaleType = LocaleType;

export type AppRoleType =
  | "ROLE_GUEST"
  | "ROLE_USER"
  | "ROLE_ADMIN"
  | "ROLE_SUPER_ADMIN"
  | `ROLE_${Uppercase<string>}`;
export type AppVersionType = `${number}.${number}.${number}`;
