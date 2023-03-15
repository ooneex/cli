import { AppConfigErrorType } from "./Config/types.ts";
import { Collection, IMatchedRoute, IRoute, IRouter } from "./deps.ts";
import { AppFullDirectoryType } from "./Directory/types.ts";
import { IEnv } from "./Env/types.ts";
import { AppStateType, IApp } from "./types.ts";

export class App implements IApp {
  public readonly env: IEnv;
  public readonly errors: AppConfigErrorType;
  public readonly directories: AppFullDirectoryType;
  public readonly router: IRouter;
  public readonly route?: IRoute;
  public readonly matchedRoute?: IMatchedRoute;
  public readonly abortController: AbortController;
  public readonly data: Collection;

  constructor(private readonly state: AppStateType) {
    this.env = state.env;
    this.errors = state.errors;
    this.directories = state.directories;
    this.router = state.router;
    this.route = state.route;
    this.abortController = state.abortController;
    this.matchedRoute = state.matchedRoute;
    this.data = new Collection();
  }

  public isFullApp(): boolean {
    return this.env.isFullApp();
  }

  public isApi(): boolean {
    return this.env.isApi();
  }
}
