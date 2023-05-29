import { get } from "../../deps.ts";
import { Keys } from "../Keys.ts";
import { Response } from "../Response.ts";

export const response = (
  // deno-lint-ignore ban-types
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number,
): void => {
  const parameters: unknown[] =
    Reflect.getOwnMetadata(Keys.Internal.Parameters, target, propertyKey) || [];
  // getOrNull
  parameters[parameterIndex] = () => get<Response>(Keys.Response);
  Reflect.defineMetadata(
    Keys.Internal.Parameters,
    parameters,
    target,
    propertyKey,
  );
};
