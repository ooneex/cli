import { IRequest, IResponse } from "./deps.ts";

export interface IMiddleware {
}

export type MiddlewareType = (
  request: IRequest,
  response: IResponse,
) => IResponse;
