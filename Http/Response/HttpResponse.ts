import { Header, HeaderContentTypeType } from "../Header/mod.ts";
import { Request } from "../Request/mod.ts";
import {
  Collection,
  ControllerType,
  get,
  Keys,
  registerConstant,
  renderView,
  RouteNotFoundException,
  ViewType,
} from "../deps.ts";
import { HttpCodeType, HttpStatusType } from "../types.ts";
import { IResponse } from "./types.ts";

export class HttpResponse implements IResponse {
  public readonly data: Collection;
  public readonly body: Collection;
  public readonly status: HttpStatusType;
  public readonly header: Header;

  constructor(
    body: Collection | null = null,
    status: HttpStatusType | null = null,
    header: Header | null = null,
  ) {
    this.data = new Collection();
    this.body = body ?? new Collection();
    this.status = status ?? HttpStatusType.OK;
    this.header = header ?? new Header();
  }

  /**
   * Render string response
   */
  public string(content: string, status?: HttpStatusType): Response {
    return this.buildResponse(content, "text/plain", status);
  }

  /**
   * Render html response
   */
  public html(content: string, status?: HttpStatusType): Response {
    return this.buildResponse(content, "text/html", status);
  }

  /**
   * Render json response
   */
  public json(
    data: Record<string, unknown> = {},
    status?: HttpStatusType,
  ): Response {
    return this.buildResponse(
      JSON.stringify(data),
      "application/json",
      status,
    );
  }

  /**
   * Render component response
   */
  public async render<T = unknown>(
    view: ViewType<T>,
    data?: T,
    status?: HttpStatusType,
  ): Promise<Response> {
    const content = await renderView(view, data);

    return this.html(content, status);
  }

  /**
   * Render not found response
   */
  public async notFound(
    message: string,
    request: Request,
    status?: HttpStatusType,
  ): Promise<Response> {
    const NotFoundController = get<ControllerType>(Keys.Controller.NotFound);
    const error = new RouteNotFoundException(
      message,
      status ?? HttpStatusType.NotFound,
    );

    const K = get<{ Exception: symbol }>(request.id);
    registerConstant(K.Exception, error);

    return await NotFoundController(request);
  }

  /**
   * Render file stream response
   * TODO: to implement
   * @see https://deno.land/manual@v1.30.0/examples/file_server
   * @see https://medium.com/deno-the-complete-reference/deno-nuggets-convert-file-to-stream-d6dae2d73192
   * @see https://opis.io/http/3.x/response-types.html
   */
  public fileStream(_file: string): Response {
    return this.string("TODO: to implement");
  }

  /**
   * Download file
   * TODO: to implement
   * @see https://deno.land/manual@v1.30.0/examples/file_server
   * @see https://stackoverflow.com/questions/61945050/how-can-i-download-big-files-in-deno
   * @see https://medium.com/deno-the-complete-reference/file-download-through-fetch-api-in-deno-771f30b19471
   * @see https://opis.io/http/3.x/response-types.html
   */
  public download(_file: string, _filename: string): Response {
    return this.string("TODO: to implement");
  }

  /**
   * Redirect response
   * TODO: to implement
   */
  public redirect(): Response {
    // TODO: redirect by route name
    // TODO: redirect by url
    // Response.redirect()
    // static redirect(url: string | URL, status?: number): Response;

    return this.string("TODO: to implement");
  }

  private getInitOptions(status?: HttpStatusType): ResponseInit {
    return {
      headers: this.header.native,
      status: status ?? this.status,
      statusText: HttpCodeType[this.status],
    };
  }

  private buildResponse(
    content: string,
    contentType: HeaderContentTypeType,
    status?: HttpStatusType,
  ): Response {
    this.header.delete("Content-Type");
    this.header.delete("Content-Length");
    this.header.contentType(contentType);
    this.header.contentLength(content.length);
    return new Response(content, this.getInitOptions(status));
  }
}
