import { ServerError } from "./Decorator/ServerError.ts";
import { Exception, HttpStatusType, Response as HttpResponse } from "./deps.ts";

export class ServerErrorController {
  @ServerError()
  public index(
    exception: Exception,
    response: HttpResponse,
  ): Response {
    // TODO: Add date
    // TODO: hide some data if the env is not local or development
    const body: Record<string, unknown> = {};
    body["exception"] = {
      name: exception.name,
      message: exception.message,
      file: exception.file,
      line: exception.line,
      column: exception.column,
      status: HttpStatusType.InternalServerError,
      data: exception.getData(),
    };

    return response.json(body, HttpStatusType.InternalServerError);
  }
}
