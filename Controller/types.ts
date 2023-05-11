import {
  Exception,
  Request,
  Response as HttpResponse,
  RouteCheckerErrorType,
} from "./deps.ts";

export type ControllerType = (request: Request) => Response;
export type ServerErrorControllerType = (
  exception: Exception,
  response: HttpResponse,
) => Response;

export type NotFoundExceptionDataType = {
  constraints: RouteCheckerErrorType[];
} | null;
