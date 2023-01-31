export type AppDirectoryType = Record<
  | "components"
  | "config"
  | "handlers"
  | "islands"
  | "middlewares"
  | "routes"
  | "static"
  | "var"
  | "views",
  string
>;

export interface IAppDirectory {
  getComponents(): string;
  getConfig(): string;
  getHandlers(): string;
  getIslands(): string;
  getMiddlewares(): string;
  getRoutes(): string;
  getStatic(): string;
  getVar(): string;
  getViews(): string;
}
