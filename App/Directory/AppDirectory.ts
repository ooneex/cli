import { AppDirectoryType } from "./types.ts";

export class AppDirectory {
  constructor(private data: AppDirectoryType) {
  }

  public getComponents(): string {
    return this.data.components;
  }

  public getConfig(): string {
    return this.data.config;
  }

  public getHandlers(): string {
    return this.data.handlers;
  }

  public getIslands(): string {
    return this.data.islands;
  }

  public getMiddlewares(): string {
    return this.data.middlewares;
  }

  public getRoutes(): string {
    return this.data.routes;
  }

  public getStatic(): string {
    return this.data.static;
  }

  public getVar(): string {
    return this.data.var;
  }

  public getViews(): string {
    return this.data.views;
  }
}
