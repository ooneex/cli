import { AppDirectories } from "../Directory/AppDirectory.ts";
import { NotFoundHandler } from "../Exception/NotFoundHandler.ts";
import { ServerErrorHandler } from "../Exception/ServerErrorHandler.ts";
import { AppConfigType } from "./types.ts";

const config: AppConfigType = {
  directories: AppDirectories,
  errors: {
    notFound: {
      view: "NotFoundView",
      handler: NotFoundHandler,
    },
    server: {
      view: "ServerErrorView",
      handler: ServerErrorHandler,
    },
  },
};

export default config;
