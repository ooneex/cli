import { IServerErrorResponse } from "../deps.ts";
import { IApp } from "../types.ts";

export const ServerErrorHandler = (
  response: IServerErrorResponse,
  _app: IApp,
): IServerErrorResponse => {
  response.body.set({ message: "Message from ServerErrorHandler" });
  // TODO:
  return response;
};
