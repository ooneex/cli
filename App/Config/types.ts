import { ViewType } from "../deps.ts";
import { AppDirectoryType } from "../Directory/types.ts";
import { NotFoundHandlerType } from "../Error/types.ts";

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
  readonly directories: AppDirectoryType;
  readonly errors: AppConfigErrorType;
};
