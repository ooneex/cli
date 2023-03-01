import { IApp, ViewType } from "../deps.ts";
import { HttpResponse } from "../Response/HttpResponse.ts";
import { HttpStatusType } from "../types.ts";
import { ServerErrorException } from "./ServerErrorException.ts";

export const OnServerError = async (
  e: unknown,
  app: IApp,
): Promise<Response> => {
  let response = new HttpResponse();
  const error = new ServerErrorException();
  error.fromNativeError(e as Error);
  response.setStatus(HttpStatusType.InternalServerError);
  const serverErrorHandler = app.errors.server.handler;
  response = await serverErrorHandler(response, app) as HttpResponse;
  const serverErrorView = app.errors.server.view;

  if (serverErrorView) {
    const viewPath = `${app.directories.views}/${serverErrorView}`;
    response.setView(viewPath as ViewType);
  }

  console.log(response);

  return response.send();
};
