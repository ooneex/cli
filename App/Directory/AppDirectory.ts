import { AppApiDirectoryType, AppFullDirectoryType } from "./types.ts";

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

export const AppFullDirectories: AppFullDirectoryType = {
  ...AppApiDirectories,
  components: "components",
  islands: "islands",
  static: "static",
  views: "views",
};
