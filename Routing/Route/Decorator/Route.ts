import {
  Collection,
  getOrNull,
  Helper,
  Keys,
  MethodDecoratorReturnType,
  registerConstant,
} from "../../deps.ts";
import { Route } from "../Route.ts";
import { RouteException } from "../RouteException.ts";
import { RouteDefinitionType, RoutePathType } from "../types.ts";

export const ROUTE = (
  name: string,
  path: RoutePathType,
  config?: Omit<RouteDefinitionType, "name" | "path" | "controller">,
): MethodDecoratorReturnType => {
  if (!name) {
    throw new RouteException(`Cannot register route. Name is required`, null, {
      try: `@route("name", "/my-route-path")`,
    });
  }

  if (!path) {
    throw new RouteException(`Cannot register route. Path is required`, null, {
      try: `@route("name", "/my-route-path")`,
    });
  }

  return (
    // deno-lint-ignore ban-types
    target: Object,
    propertyName: string,
    // deno-lint-ignore no-explicit-any
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    if (!target || !propertyName || !Helper.isObject(descriptor)) {
      throw new RouteException(
        `Cannot register route. Available only for class method`,
      );
    }

    const method = descriptor.value!;

    descriptor.value = function Controller(): Response {
      const parameters = Reflect.getOwnMetadata(
        Keys.Internal.Parameters,
        target,
        propertyName,
      );

      return method.apply(this, parameters);
    };

    let routes = getOrNull<Collection<string, Route>>(Keys.Routes);

    if (!routes) {
      routes = new Collection<string, Route>();
      registerConstant(Keys.Routes, routes);
    }

    if (routes.has(name)) {
      throw new RouteException(
        `Cannot register route. Name "${name}" already exists`,
      );
    }

    const route = new Route({
      name,
      path,
      controller: descriptor.value,
      ...config,
    });

    routes.add(name, route);
  };
};
