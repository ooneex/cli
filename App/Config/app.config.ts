import { AppDefaultDirectories } from "../Directory/AppDirectory.ts";
import { NotFoundHandler } from "../Error/NotFoundHandler.ts";
import { ServerErrorHandler } from "../Error/ServerErrorHandler.ts";
import { AppConfigType } from "./types.ts";

const config: AppConfigType = {
  directories: AppDefaultDirectories,
  errors: {
    notFound: {
      view: "NotFoundView.tsx",
      handler: NotFoundHandler,
    },
    server: {
      view: "ServerErrorView.tsx",
      handler: ServerErrorHandler,
    },
  },
};

export default config;
