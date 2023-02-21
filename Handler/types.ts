import { IApp } from "../App/types.ts";
import { IHandlerResponse, IRequest } from "./deps.ts";

export type HandlerType = (
  request: IRequest,
  response: IHandlerResponse,
  app: IApp,
) => IHandlerResponse;
