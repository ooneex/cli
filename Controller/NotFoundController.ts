import { NotFound } from "./Decorator/NotFound.ts";
import {
  Exception,
  exception,
  HttpRequest,
  HttpResponse,
  HttpStatusType,
  request,
  response,
} from "./deps.ts";
import { NotFoundExceptionDataType } from "./types.ts";

// TODO: https://jsonapi.org/format/1.2/#errors-processing

export class NotFoundController {
  @NotFound()
  public async index(
    @request _request: HttpRequest,
    @response response: HttpResponse,
    @exception exception: Exception,
  ): Promise<Response> {
    const e = exception.current() as Exception;

    const data: Record<string, unknown> = {};
    data["exception"] = {
      name: e.name,
      message: e.message,
      data: e.getData<NotFoundExceptionDataType>(),
    };

    return await response.json(data, e.status ?? HttpStatusType.NotFound);
  }
}
