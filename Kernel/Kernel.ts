import { ConfigValidationException } from "./ConfigValidationException.ts";
import {
  ApiConfigSchema,
  App,
  Collection,
  EnvHelper,
  EnvSchema,
  get,
  Keys,
  loadControllers,
  Log,
  parseConfig,
  registerConstant,
  Route,
  Router,
  ViewConfigSchema,
  ZodError,
} from "./deps.ts";
import { EnvValidationException } from "./EnvValidationException.ts";
import { parseEnv } from "./parseEnv.ts";

window.Log = Log;

export class Kernel {
  public static async boot(): Promise<void> {
    // Load env vars
    const env = parseEnv();

    const envData = env.toJson();
    const result = EnvSchema.safeParse(envData);

    if (!result.success) {
      const error = result.error.issues[0];

      throw new EnvValidationException(
        `${error.path.join(".")}: ${error.message}`,
      );
    }

    registerConstant(Keys.Env.Default, env);
    registerConstant(Keys.Env.Helper, new EnvHelper());

    // Load config
    const config = await parseConfig();

    let configValidationError: null | ZodError = null;
    if (App.isApi()) {
      const result = ApiConfigSchema.safeParse(config);
      if (!result.success) {
        configValidationError = result.error;
      }
    }

    if (App.isView()) {
      const result = ViewConfigSchema.safeParse(config);
      if (!result.success) {
        configValidationError = result.error;
      }
    }

    if (configValidationError) {
      const error = configValidationError.issues[0];

      throw new ConfigValidationException(
        `${error.path.join(".")}: ${error.message}`,
      );
    }

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
