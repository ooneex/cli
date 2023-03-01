import { ViewType } from "../deps.ts";
import {AppApiDirectoryType, AppDirectoryType} from "../Directory/types.ts";
import { NotFoundHandlerType } from "../Exception/types.ts";

export type AppConfigErrorType = {
  readonly notFound: {
    readonly view?: ViewType;
    readonly handler: NotFoundHandlerType;
  };
  readonly server: {
    readonly view?: ViewType;
    readonly handler: NotFoundHandlerType;
  };
};

export type AppConfigType = {
  readonly directories: AppDirectoryType | AppApiDirectoryType;
  readonly errors: AppConfigErrorType;
};
