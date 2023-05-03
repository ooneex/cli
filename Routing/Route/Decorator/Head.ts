import { MethodDecoratorReturnType } from "../../deps.ts";
import { RouteDefinitionType, RoutePathType } from "../types.ts";
import { ROUTE } from "./route.ts";

export const HEAD = (
  name: string,
  path: RoutePathType,
  config?: Omit<
    RouteDefinitionType,
    "name" | "path" | "controller" | "methods"
  >,
): MethodDecoratorReturnType => {
  return ROUTE(name, path, {
    ...config,
    methods: ["HEAD"],
  });
};
