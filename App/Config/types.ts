import {
  ComponentType,
  ErrorHandler,
  ErrorPageProps,
  UnknownHandler,
  UnknownPageProps,
} from "../deps.ts";
import { AppDirectoryType } from "../Directory/types.ts";

export type AppConfigErrorType = {
  notFound: {
    view?: ComponentType<UnknownPageProps>;
    handler: UnknownHandler;
  };
  server: {
    view?: ComponentType<ErrorPageProps>;
    handler: ErrorHandler;
  };
};

export type AppConfigType = {
  directories: AppDirectoryType;
  errors: AppConfigErrorType;
};
