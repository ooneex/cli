import { NotFound } from "./Decorator/NotFound.ts";
import {
  Exception,
  exception,
  HttpRequest as Request,
  HttpResponse,
  HttpStatusType,
} from "./deps.ts";
import { NotFoundExceptionDataType } from "./types.ts";

export class NotFoundController {
  @NotFound()
  public async index(
    _request: Request,
    response: HttpResponse,
    @exception exception: Exception,
  ): Promise<Response> {
    const data: Record<string, unknown> = {};
    data["exception"] = {
      name: exception.name,
      message: exception.message,
      data: exception.getData<NotFoundExceptionDataType>(),
    };

    return await response.json(
      data,
      exception.status ?? HttpStatusType.NotFound,
    );
  }
}
