import {
  Exception,
  HttpRequest,
  HttpResponse,
  RouteCheckerErrorType,
} from "./deps.ts";

export type ControllerType = (request: HttpRequest) => Response;
export type ServerErrorControllerType = (
  exception: Exception,
  response: HttpResponse,
) => Response;

export type NotFoundExceptionDataType = {
  constraints: RouteCheckerErrorType[];
} | null;
