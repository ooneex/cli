import {
  AppConfigType,
  AppDefaultDirectories,
  NotFoundHandler,
  NotFoundView,
  ServerErrorHandler,
  ServerErrorView,
} from "@ooneex/app";

const config: AppConfigType = {
  directories: AppDefaultDirectories,
  errors: {
    notFound: {
      view: NotFoundView,
      handler: NotFoundHandler,
    },
    server: {
      view: ServerErrorView,
      handler: ServerErrorHandler,
    },
  },
};
export default config;
