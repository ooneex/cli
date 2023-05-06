import { ServerError } from "./Decorator/ServerError.ts";
import {
  Exception,
  exception,
  HttpResponse,
  HttpStatusType,
  response,
} from "./deps.ts";

export class ServerErrorController {
  @ServerError()
  public index(
    @response response: HttpResponse,
    @exception exception: Exception,
  ): Response {
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
