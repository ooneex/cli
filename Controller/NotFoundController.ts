import { NotFound } from "./Decorator/NotFound.ts";
import {
  DotEnvValueType,
  EnvHelper,
  exception,
  get,
  HttpCodeType,
  HttpResponse,
  HttpStatusType,
  ICollection,
  IException as IHttpException,
  IRequest as IHttpRequest,
  Keys,
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
    const status = exception.status ?? HttpStatusType.NotFound;
    const envHelper = get<EnvHelper>(Keys.Env.Helper);

    if (envHelper.isDebug()) {
      return response.json({
        name: exception.name,
        // @ts-ignore: trust me
        message: HttpCodeType[status] ?? HttpCodeType[HttpStatusType.NotFound],
        status,
      }, status);
    }

    const env = get<ICollection<string, DotEnvValueType>>(Keys.Env.Default);

    const data: Record<string, unknown> = {
      name: exception.name,
      message: exception.message,
      status,
      date: exception.date.toJSON(),
      data: exception.getData<NotFoundExceptionDataType>(),
      env: env.toJson(),
    };

    return await response.json(
      data,
      status,
    );
  }
}
