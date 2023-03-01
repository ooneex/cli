import {AppApiDirectoryType, AppDirectoryType} from "./types.ts";

export const AppApiDirectories: AppApiDirectoryType = {
  bin: "bin",
  config: "config",
  fixtures: "fixtures",
  handlers: "handlers",
  middlewares: "middlewares",
  migrations: "migrations",
  routes: "routes",
  var: "var",
};

export const AppDirectories: AppDirectoryType = {
  ...AppApiDirectories,
  components: "components",
  islands: "islands",
  static: "static",
  views: "views",
};
