import { getOrNull, Keys, ParameterDecoratorReturnType } from "../../deps.ts";
import { ParamInjectionException } from "../ParamInjectionException.ts";

export const param = (key: string): ParameterDecoratorReturnType => {
  return (
    // deno-lint-ignore ban-types
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number,
  ): void => {
    const parameters: unknown[] =
      Reflect.getOwnMetadata(Keys.Internal.Parameters, target, propertyKey) ||
      [];

    parameters[parameterIndex] = () => {
      const params: Record<string, unknown> = getOrNull(Keys.Route.Params) ??
        {};

      if (!params[key]) {
        throw new ParamInjectionException(`Cannot inject "${key}" parameter`);
      }

      return params[key];
    };
    Reflect.defineMetadata(
      Keys.Internal.Parameters,
      parameters,
      target,
      propertyKey,
    );
  };
};
