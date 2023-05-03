import { DotEnvValueType, get, ICollection, Keys } from "../deps.ts";

export const appConfig = (
  // deno-lint-ignore ban-types
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number,
): void => {
  const parameters: unknown[] =
    Reflect.getOwnMetadata(Keys.Internal.Parameters, target, propertyKey) || [];
  parameters[parameterIndex] = get<ICollection<string, DotEnvValueType>>(
    Keys.Config.App,
  );
  Reflect.defineMetadata(
    Keys.Internal.Parameters,
    parameters,
    target,
    propertyKey,
  );
};
