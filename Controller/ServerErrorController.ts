import { ServerError } from "./Decorator/ServerError.ts";
import {
  DotEnvValueType,
  EnvHelper,
  get,
  HttpCodeType,
  HttpResponse,
  HttpStatusType,
  ICollection,
  Keys,
} from "./deps.ts";

import type { IException } from "./deps.ts";

export class ServerErrorController {
  @ServerError()
  public index(
    exception: IException,
    response: HttpResponse,
  ): Response {
    const status = HttpStatusType.InternalServerError;
    const envHelper = get<EnvHelper>(Keys.Env.Helper);

    if (!envHelper.isDebug()) {
      return response.json({
        name: exception.name,
        message: HttpCodeType[HttpStatusType.InternalServerError],
        status,
      }, status);
    }

    const env = get<ICollection<string, DotEnvValueType>>(Keys.Env.Default);

    const body: Record<string, unknown> = {
      name: exception.name,
      message: exception.message,
      file: exception.file,
      line: exception.line,
      column: exception.column,
      status,
      date: exception.date.toJSON(),
      stacks: exception.stacks,
      env: env.toJson(),
    };

    return response.json(body, status);
  }
}
