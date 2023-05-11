import { MethodDecoratorReturnType } from "../../deps.ts";
import { RouteDefinitionType, RoutePathType } from "../types.ts";
import { Route } from "./Route.ts";

export const Head = (
  name: string,
  path: RoutePathType,
  config?: Omit<
    RouteDefinitionType,
    "name" | "path" | "controller" | "methods"
  >,
): MethodDecoratorReturnType => {
  return Route(name, path, {
    ...config,
    methods: ["HEAD"],
  });
};
