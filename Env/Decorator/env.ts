import {
  get,
  ICollection,
  Keys,
  ParameterDecoratorReturnType,
} from "../deps.ts";
import { DotEnvValueType } from "../types.ts";

export const env = (key?: string): ParameterDecoratorReturnType => {
  return (
    // deno-lint-ignore ban-types
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number,
  ): void => {
    const parameters: unknown[] =
      Reflect.getOwnMetadata(Keys.Internal.Parameters, target, propertyKey) ||
      [];
    const env = get<ICollection<string, DotEnvValueType>>(Keys.Env.Default);
    parameters[parameterIndex] = key ? env.get(key) : env;
    Reflect.defineMetadata(
      Keys.Internal.Parameters,
      parameters,
      target,
      propertyKey,
    );
  };
};
