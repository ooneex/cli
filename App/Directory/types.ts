export type AppDirectoryType = AppApiDirectoryType & {
  readonly components: string;
  readonly islands: string;
  readonly static: string;
  readonly views: string;
};

export type AppApiDirectoryType = {
  readonly bin: string;
  readonly config: string;
  readonly fixtures: string;
  readonly handlers: string;
  readonly middlewares: string;
  readonly migrations: string;
  readonly routes: string;
  readonly var: string;
};
