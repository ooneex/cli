import {
  Collection,
  EnvHelper,
  get,
  Keys,
  loadControllers,
  Log,
  parseConfig,
  registerConstant,
  Route,
  Router,
} from "./deps.ts";
import { parseEnv } from "./parseEnv.ts";

window.Log = Log;

export class Kernel {
  public static async boot(): Promise<void> {
    // Load env vars
    const env = parseEnv();
    registerConstant(Keys.Env.Default, env);
    registerConstant(Keys.Env.Helper, new EnvHelper());

    // Load config
    const config = await parseConfig();
    registerConstant(Keys.Config.App, config);

    // Load controllers
    const controllers = await loadControllers();
    registerConstant(Keys.Controller.Default, controllers);

    // Register router
    const routes = get<Collection<string, Route>>(Keys.Routes);
    registerConstant(Keys.Router, new Router(routes));

    // Abort Controller
    registerConstant(Keys.AbortController, new AbortController());
  }
}
