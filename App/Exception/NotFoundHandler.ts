import { INotFoundResponse, IRequest } from "../deps.ts";
import { IApp } from "../types.ts";

export const NotFoundHandler = (
  _request: IRequest,
  response: INotFoundResponse,
  _app: IApp,
): INotFoundResponse => {
  console.log(response);
  response.body.set({ message: "Message from NotFoundHandler" });

  return response;
};
