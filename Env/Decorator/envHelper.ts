import { get, Keys } from "../deps.ts";
import { EnvHelper } from "../EnvHelper.ts";

export const envHelper = (
  // deno-lint-ignore ban-types
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number,
): void => {
  const parameters: unknown[] =
    Reflect.getOwnMetadata(Keys.Internal.Parameters, target, propertyKey) || [];
  // getOrNull
  parameters[parameterIndex] = () => get<EnvHelper>(Keys.Env.Helper);
  Reflect.defineMetadata(
    Keys.Internal.Parameters,
    parameters,
    target,
    propertyKey,
  );
};
