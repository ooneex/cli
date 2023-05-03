import {
  ControllerType,
  Exception,
  get,
  Keys,
  registerConstant,
} from "../deps.ts";

export const onServerError = (
  error: unknown,
): Response => {
  // TODO: set exception data if needed
  registerConstant(Keys.Exception, new Exception(error as Error));

  const ServerError = get<ControllerType>(
    Keys.Controller.ServerError,
  );

  return ServerError();
};
