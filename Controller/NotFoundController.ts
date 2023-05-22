import { NotFound } from "./Decorator/NotFound.ts";
import {
  exception,
  HttpResponse,
  HttpStatusType,
  IException as IHttpException,
  IRequest as IHttpRequest,
} from "./deps.ts";
import { NotFoundExceptionDataType } from "./types.ts";

// deno-lint-ignore no-empty-interface
interface IRequest extends IHttpRequest {}
// deno-lint-ignore no-empty-interface
interface IException extends IHttpException {}

export class NotFoundController {
  @NotFound()
  public async index(
    _request: IRequest,
    response: HttpResponse,
    @exception exception: IException,
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
