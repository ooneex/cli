import {
  Helper,
  Keys,
  MethodDecoratorReturnType,
  registerConstant,
  RouteException,
} from "../deps.ts";
import { ControllerType } from "../types.ts";

export const ServerError = (): MethodDecoratorReturnType => {
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

    descriptor.value = function ServerErrorController(): Response {
      const parameters = Reflect.getOwnMetadata(
        Keys.Internal.Parameters,
        target,
        propertyName,
      );

      return method.apply(this, parameters);
    };

    registerConstant<ControllerType>(
      Keys.Controller.ServerError,
      descriptor.value,
    );
  };
};
