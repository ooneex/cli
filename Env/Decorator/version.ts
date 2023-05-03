import { get, ICollection, Keys } from "../deps.ts";
import { DotEnvType } from "../types.ts";

export const version = (
  // deno-lint-ignore ban-types
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number,
): void => {
  const parameters: unknown[] =
    Reflect.getOwnMetadata(Keys.Internal.Parameters, target, propertyKey) || [];
  parameters[parameterIndex] = get<ICollection<string, DotEnvType>>(
    Keys.Env.Default,
  )
    .get("VERSION");
  Reflect.defineMetadata(
    Keys.Internal.Parameters,
    parameters,
    target,
    propertyKey,
  );
};
