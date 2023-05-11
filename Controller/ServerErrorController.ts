import { ServerError } from "./Decorator/ServerError.ts";
import { Exception, HttpResponse, HttpStatusType } from "./deps.ts";

export class ServerErrorController {
  @ServerError()
  public index(
    exception: Exception,
    response: HttpResponse,
  ): Response {
    // Todo: Add date
    const body: Record<string, unknown> = {};
    body["exception"] = {
      name: exception.name,
      message: exception.message,
      file: exception.file,
      line: exception.line,
      column: exception.column,
      data: exception.getData(),
    };

    return response.json(body, HttpStatusType.InternalServerError);
  }
}
