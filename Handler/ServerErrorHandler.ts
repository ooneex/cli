import { IApp, IServerErrorResponse } from "./deps.ts";

// TODO: implement
export const ServerErrorHandler = (
  response: IServerErrorResponse,
  _app: IApp,
): IServerErrorResponse => {
  response.data.set({
    message: "Message from ServerErrorHandler: " +
      response.getError()?.getMessage(),
  });

  return response;
};
