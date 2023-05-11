import { Exception, get, Keys, ServerErrorControllerType } from "../deps.ts";
import { HttpResponse } from "../Response/mod.ts";

export const onServerError = (
  error: unknown,
): Response => {
  const ServerErrorController = get<ServerErrorControllerType>(
    Keys.Controller.ServerError,
  );

  const exception = new Exception(error as Error);
  const response = new HttpResponse();

  return ServerErrorController(exception, response);
};
