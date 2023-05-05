import { MethodDecoratorReturnType } from "../../deps.ts";
import { RouteDefinitionType, RoutePathType } from "../types.ts";
import { ROUTE } from "./Route.ts";

export const PUT = (
  name: string,
  path: RoutePathType,
  config?: Omit<
    RouteDefinitionType,
    "name" | "path" | "controller" | "methods"
  >,
): MethodDecoratorReturnType => {
  return ROUTE(name, path, {
    ...config,
    methods: ["PUT"],
  });
};
