import {
  Collection,
  get,
  getOrNull,
  Helper,
  HttpRequest,
  Keys,
  MethodDecoratorReturnType,
  registerConstant,
} from "../../deps.ts";
import { Route as HttpRoute } from "../Route.ts";
import { RouteException } from "../RouteException.ts";
import { RouteDefinitionType, RoutePathType } from "../types.ts";

export const Route = (
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

    descriptor.value = function Controller(request: HttpRequest): Response {
      let parameters = Reflect.getOwnMetadata(
        Keys.Internal.Parameters,
        target,
        propertyName,
      ) ?? [];

      parameters[0] = request;
      const K = get<{ Response: symbol }>(request.id);
      const response = get(K.Response);
      parameters[1] = response;

      parameters = parameters.map((parameter: unknown) => {
        if (typeof parameter === "function") {
          return parameter.apply(target);
        }

        return parameter;
      });

      return method.apply(this, parameters);
    };

    let routes = getOrNull<Collection<string, HttpRoute>>(Keys.Routes);

    if (!routes) {
      routes = new Collection<string, HttpRoute>();
      registerConstant(Keys.Routes, routes);
    }

    if (routes.has(name)) {
      throw new RouteException(
        `Cannot register route. Name "${name}" already exists`,
      );
    }

    const route = new HttpRoute({
      name,
      path,
      controller: descriptor.value,
      ...config,
    });

    routes.add(name, route);
  };
};
