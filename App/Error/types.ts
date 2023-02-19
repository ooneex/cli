import { INotFoundResponse, IRequest } from "../deps.ts";
import { IApp } from "../types.ts";

export type NotFoundHandlerType = (
  request: IRequest,
  response: INotFoundResponse,
  app: IApp,
) => INotFoundResponse;
