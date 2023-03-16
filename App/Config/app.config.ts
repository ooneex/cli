import { NotFoundHandler, ServerErrorHandler } from "../deps.ts";
import { AppFullDirectories } from "../Directory/AppDirectory.ts";
import { AppConfigType } from "./types.ts";

const config: AppConfigType = {
  directories: AppFullDirectories,
  errors: {
    notFound: {
      view: "Exception/NotFoundView",
      handler: NotFoundHandler,
    },
    server: {
      view: "Exception/ServerErrorView",
      handler: ServerErrorHandler,
    },
  },
};

export default config;
