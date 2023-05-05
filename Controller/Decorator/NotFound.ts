import {
  Helper,
  Keys,
  MethodDecoratorReturnType,
  registerConstant,
  RouteException,
} from "../deps.ts";
import { ControllerType } from "../types.ts";

export const NotFound = (): MethodDecoratorReturnType => {
  return (
    // deno-lint-ignore ban-types
    target: Object,
    propertyName: string,
    // deno-lint-ignore no-explicit-any
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    if (!target || !propertyName || !Helper.isObject(descriptor)) {
      throw new RouteException(
        `Cannot register not found controller. Available only for class method`,
      );
    }

    const method = descriptor.value!;

    descriptor.value = function NotFoundController(): Response {
      let parameters = Reflect.getOwnMetadata(
        Keys.Internal.Parameters,
        target,
        propertyName,
      );

      parameters = (parameters ?? []).map((parameter: unknown) => {
        if (typeof parameter === "function") {
          return parameter.apply(target);
        }

        return parameter;
      });

      return method.apply(this, parameters);
    };

    registerConstant<ControllerType>(
      Keys.Controller.NotFound,
      descriptor.value,
    );
  };
};
