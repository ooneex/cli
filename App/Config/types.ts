import { ComponentType, ErrorPageProps, UnknownPageProps } from "../deps.ts";
import { AppDirectoryType } from "../Directory/types.ts";

export type AppConfigErrorType = {
  notFound: ComponentType<UnknownPageProps>;
  server: ComponentType<ErrorPageProps>;
};

export type AppConfigType = {
  directories: AppDirectoryType;
  errors: AppConfigErrorType;
};

export interface IAppConfig {
  parse(): void;

  getDirectories(): AppDirectoryType | null;

  getErrors(): AppConfigErrorType | null;
}
