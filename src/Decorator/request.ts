import { get } from "../../deps.ts";
import { Keys } from "../Keys.ts";
import { IRequest } from "../types.ts";

export const request = (
  // deno-lint-ignore ban-types
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number,
): void => {
  const parameters: unknown[] =
    Reflect.getOwnMetadata(Keys.Internal.Parameters, target, propertyKey) || [];
  // getOrNull
  parameters[parameterIndex] = () => get<IRequest>(Keys.Request);
  Reflect.defineMetadata(
    Keys.Internal.Parameters,
    parameters,
    target,
    propertyKey,
  );
};
