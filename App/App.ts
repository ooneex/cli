import { AppConfigErrorType } from "./Config/types.ts";
import { Collection, IMatchedRoute, IRoute, IRouter } from "./deps.ts";
import { AppDirectoryType } from "./Directory/types.ts";
import { IEnv } from "./Env/types.ts";
import { AppStateType, IApp } from "./types.ts";

// TODO: Refactor readonly. Use Readonly<Type>
export class App implements IApp {
  public readonly env: IEnv;
  public readonly errors: AppConfigErrorType;
  public readonly directories: AppDirectoryType;
  public readonly router: IRouter;
  public readonly route?: IRoute;
  public readonly matchedRoute?: IMatchedRoute;
  public readonly data: Collection;

  constructor(private readonly state: AppStateType) {
    this.env = state.env;
    this.errors = state.errors;
    this.directories = state.directories;
    this.router = state.router;
    this.route = state.route;
    this.matchedRoute = state.matchedRoute;
    this.data = new Collection();
  }
}
