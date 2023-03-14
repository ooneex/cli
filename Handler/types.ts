import {
  IApp,
  IHandlerResponse,
  INotFoundResponse,
  IRequest,
  IServerErrorResponse,
} from "./deps.ts";

export type HandlerType = (
  request: IRequest,
  response: IHandlerResponse,
  app: IApp,
) => IHandlerResponse;

export type NotFoundHandlerType = (
  request: IRequest,
  response: INotFoundResponse,
  app: IApp,
) => INotFoundResponse;

export type ServerErrorHandlerType = (
  response: IServerErrorResponse,
  app: IApp,
) => IServerErrorResponse;
