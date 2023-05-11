import {
  Decorator,
  Exception,
  Helper,
  Keys,
  registerConstant,
  Response as HttpResponse,
  RouteException,
} from "../deps.ts";
import { ControllerType } from "../types.ts";

export const ServerError = (): Decorator.MethodDecoratorReturnType => {
  return (
    // deno-lint-ignore ban-types
    target: Object,
    propertyName: string,
    // deno-lint-ignore no-explicit-any
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    if (!target || !propertyName || !Helper.isObject(descriptor)) {
      throw new RouteException(
        `Cannot register server error controller. Available only for class method`,
      );
    }

    const method = descriptor.value!;

    descriptor.value = function ServerErrorController(
      exception: Exception,
      response: HttpResponse,
    ): Response {
      let parameters = Reflect.getOwnMetadata(
        Keys.Internal.Parameters,
        target,
        propertyName,
      ) ?? [];

      parameters[0] = exception;
      parameters[1] = response;

      parameters = (parameters ?? []).map((parameter: unknown) => {
        if (typeof parameter === "function") {
          return parameter.apply(target);
        }

        return parameter;
      });

      return method.apply(this, parameters);
    };

    registerConstant<ControllerType>(
      Keys.Controller.ServerError,
      descriptor.value,
    );
  };
};
