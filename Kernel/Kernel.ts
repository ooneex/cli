import { ConfigValidationException } from "./ConfigValidationException.ts";
import {
  ApiConfigSchema,
  App,
  AppType,
  EnvHelper,
  EnvSchema,
  Keys,
  Log,
  registerConstant,
  ViewConfigSchema,
  ZodError,
} from "./deps.ts";
import { EnvValidationException } from "./EnvValidationException.ts";
import { parseEnv } from "./parseEnv.ts";

window.Log = Log;

type BootConfigType = {
  app: Record<string, unknown>;
  type: AppType;
  rootDir: string;
};

export class Kernel {
  public static boot(config: BootConfigType): void {
    registerConstant(Keys.Config.App, config.app);
    registerConstant(Keys.App.Type, config.type);
    registerConstant(Keys.App.RootDir, config.rootDir);

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

    let configValidationError: null | ZodError = null;
    if (App.isApi()) {
      const result = ApiConfigSchema.safeParse(config.app);
      if (!result.success) {
        configValidationError = result.error;
      }
    }

    if (App.isView()) {
      const result = ViewConfigSchema.safeParse(config.app);
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

    // Abort Controller
    registerConstant(Keys.AbortController, new AbortController());
  }
}
