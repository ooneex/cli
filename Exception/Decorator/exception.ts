import { container, Keys } from "../deps.ts";

export const exception = (
  // deno-lint-ignore ban-types
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number,
): void => {
  const parameters: unknown[] =
    Reflect.getOwnMetadata(Keys.Internal.Parameters, target, propertyKey) ||
    [];
  if (!container.isBound(Keys.Exception)) {
    parameters[parameterIndex] = null;
  } else {
    parameters[parameterIndex] = container.get(Keys.Exception);
  }

  Reflect.defineMetadata(
    Keys.Internal.Parameters,
    parameters,
    target,
    propertyKey,
  );
};
