import { RouteCheckerErrorType } from "./deps.ts";

export type ControllerType = () => Response;

export type NotFoundExceptionDataType = {
  constraints: RouteCheckerErrorType[];
} | null;
