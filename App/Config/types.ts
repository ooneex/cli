import {
  NotFoundHandlerType,
  ServerErrorHandlerType,
  ViewType,
} from "../deps.ts";
import {
  AppApiDirectoryType,
  AppFullDirectoryType,
} from "../Directory/types.ts";

export type AppConfigErrorType = {
  readonly notFound: {
    readonly view?: ViewType;
    readonly handler: NotFoundHandlerType;
  };
  readonly server: {
    readonly view?: ViewType;
    readonly handler: ServerErrorHandlerType;
  };
};

export type AppConfigType = {
  readonly directories: AppFullDirectoryType | AppApiDirectoryType;
  readonly errors: AppConfigErrorType;
};
