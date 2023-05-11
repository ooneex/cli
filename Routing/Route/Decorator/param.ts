import {
  get,
  getOrNull,
  Keys,
  ParameterDecoratorReturnType,
  Request,
} from "../../deps.ts";
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
      const request: Request | null = parameters[0] as Request;

      if (!(request instanceof Request)) {
        return null;
      }

      const K = get<{ Route: { Params: symbol } }>(request.id);

      const params: Record<string, unknown> = getOrNull(K.Route.Params) ??
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
