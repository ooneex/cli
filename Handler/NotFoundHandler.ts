import { IApp, INotFoundResponse, IRequest } from "./deps.ts";

export const NotFoundHandler = (
  _request: IRequest,
  response: INotFoundResponse,
  _app: IApp,
): INotFoundResponse => {
  response.body.set({ message: "Message from NotFoundHandler" });

  return response;
};
