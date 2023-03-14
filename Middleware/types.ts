import { IRequest, IResponse } from "./deps.ts";

export type MiddlewareType = (
  request: IRequest,
  response: IResponse,
) => IResponse;
