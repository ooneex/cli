import {
  Exception,
  HttpResponse,
  IRequest as IHttpRequest,
  RouteCheckerErrorType,
} from "./deps.ts";

export type ControllerType = (request: IHttpRequest) => Response;
export type ServerErrorControllerType = (
  exception: Exception,
  response: HttpResponse,
) => Response;

export type NotFoundExceptionDataType = {
  constraints: RouteCheckerErrorType[];
} | null;
