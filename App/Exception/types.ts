import { INotFoundResponse, IRequest, IServerErrorResponse } from "../deps.ts";
import { IApp } from "../types.ts";

export type NotFoundHandlerType = (
  request: IRequest,
  response: INotFoundResponse,
  app: IApp,
) => INotFoundResponse;

export type ServerErrorHandlerType = (
  response: IServerErrorResponse,
  app: IApp,
) => IServerErrorResponse;
