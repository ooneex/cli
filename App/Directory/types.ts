export type AppFullDirectoryType = AppApiDirectoryType & {
  components: string;
  islands: string;
  static: string;
  views: string;
};

export type AppApiDirectoryType = {
  bin: string;
  config: string;
  fixtures: string;
  handlers: string;
  middlewares: string;
  migrations: string;
  routes: string;
  var: string;
};
