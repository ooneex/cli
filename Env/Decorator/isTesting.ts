import { EnvHelper } from "../EnvHelper.ts";
import { get, Keys } from "../deps.ts";

export const isTesting = (
  // deno-lint-ignore ban-types
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number,
): void => {
  const parameters: unknown[] =
    Reflect.getOwnMetadata(Keys.Internal.Parameters, target, propertyKey) || [];
  const envHelper = get<EnvHelper>(Keys.Env.Helper);
  parameters[parameterIndex] = envHelper.isTesting();
  Reflect.defineMetadata(
    Keys.Internal.Parameters,
    parameters,
    target,
    propertyKey,
  );
};
