import {
  Collection,
  get,
  getOrNull,
  Helper,
  Keys,
  MethodDecoratorReturnType,
  registerConstant,
  Request,
  z,
} from "../../deps.ts";
import { Route as HttpRoute } from "../Route.ts";
import { RouteConfigException } from "../RouteConfigException.ts";
import { RouteException } from "../RouteException.ts";
import { RouteDefinitionSchema } from "../schema.ts";
import { RouteDefinitionType, RoutePathType } from "../types.ts";

export const Route = (
  name: z.infer<typeof RouteDefinitionSchema.shape.name>,
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

    descriptor.value = function Controller(request: Request): Response {
      // @ts-ignore: trust me
      let parameters = Reflect.getOwnMetadata(
        Keys.Internal.Parameters,
        target,
        propertyName,
      ) ?? [];

      parameters[0] = request;
      const K = get<{ Response: symbol }>(request.id);
      parameters[1] = get(K.Response);

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

    const routeConfig = {
      name,
      path,
      controller: descriptor.value,
      ...config,
    };

    const result = RouteDefinitionSchema.safeParse(routeConfig);

    if (!result.success) {
      const error = result.error.issues[0];

      throw new RouteConfigException(
        `${error.path.join(".")}: ${error.message}`,
        null,
        { name, path },
      );
    }

    const route = new HttpRoute(routeConfig);

    routes.add(name, route);
  };
};
