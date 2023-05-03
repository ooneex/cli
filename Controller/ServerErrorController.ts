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
    const e = exception.current() as Exception;

    const body: Record<string, unknown> = {};
    body["exception"] = {
      name: e.name,
      message: e.message,
      file: e.file,
      line: e.line,
      column: e.column,
      data: e.getData(),
    };

    return response.json(body, HttpStatusType.InternalServerError);
  }
}
