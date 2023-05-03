import {
  Collection,
  EnvHelper,
  Exception,
  HttpRequest,
  HttpResponse,
  Keys,
  loadControllers,
  parseConfig,
  registerConstant,
  Route,
  Router,
} from "./deps.ts";
import { parseEnv } from "./parseEnv.ts";

type LocalConfigType = {
  controllers: string;
  var: string;
};

export class Kernel {
  public static async boot(): Promise<void> {
    // Load env vars
    const env = parseEnv();
    registerConstant(Keys.Env.Default, env);
    registerConstant(Keys.Env.Helper, new EnvHelper());

    // Load config
    const config: LocalConfigType = await parseConfig() as LocalConfigType;
    registerConstant(Keys.Config.App, config);

    // Register initial response
    registerConstant(Keys.Response, new HttpResponse());

    // Register initial request
    registerConstant(Keys.Request, new HttpRequest());

    // Register initial exception
    registerConstant(Keys.Exception, new Exception(""));

    // Load routes
    const routes = new Collection<string, Route>();
    registerConstant(Keys.Routes, routes);

    // Load controllers
    const controllers = await loadControllers();
    registerConstant(Keys.Controller.Default, controllers);

    // Register router
    registerConstant(Keys.Router, new Router(routes));

    // Abort Controller
    registerConstant(Keys.AbortController, new AbortController());
  }
}
