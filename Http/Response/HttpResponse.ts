import {
  Collection,
  Helper,
  IApp,
  IException,
  view,
  ViewType,
} from "../deps.ts";
import { Header } from "../Header/Header.ts";
import { HeaderContentType } from "../Header/types.ts";
import { HttpRequest } from "../Request/HttpRequest.ts";
import { HttpCodeType, HttpStatusType } from "../types.ts";
import { CharsetType, IResponse } from "./types.ts";

export class HttpResponse implements IResponse {
  private status: HttpStatusType | null = null;
  private error: IException | null = null;
  private view: ViewType | null = null;
  private renderRouteView = false;
  private notFound = false;
  private result: Response;
  private charset: CharsetType = "utf-8";
  /**
   * For view
   */
  public readonly data: Collection;
  /**
   * For json response
   */
  public readonly body: Collection;
  public readonly headers: Header;

  constructor() {
    this.data = new Collection<string, unknown>();
    this.body = new Collection<string, unknown>();
    this.headers = new Header(new Headers());
    this.result = new Response();
  }

  public getError(): IException | null {
    return this.error;
  }

  public setError(error: IException | null): this {
    this.error = error;

    return this;
  }

  public setView(view: ViewType | null): this {
    this.view = view;

    return this;
  }

  public getView(): ViewType | null {
    return this.view;
  }

  public getStatus(): HttpStatusType | null {
    return this.status;
  }

  public setStatus(status: HttpStatusType): this {
    this.status = status;

    return this;
  }

  public getCharset(): CharsetType {
    return this.charset;
  }

  public setCharset(value: CharsetType): this {
    this.charset = value;

    return this;
  }

  /**
   * Render string response
   */
  public string(content: string): this {
    this.result = this.buildResponse(content, "text/plain");

    return this;
  }

  /**
   * Render html response
   */
  public html(content: string): this {
    this.result = this.buildResponse(content, "text/html");

    return this;
  }

  /**
   * Render json response
   */
  public json(data?: Record<string, unknown>): this {
    this.result = this.buildResponse(
      JSON.stringify(data ?? this.body.getData()),
      "application/json",
    );

    return this;
  }

  /**
   * Render file stream response
   * TODO: to implement
   * @see https://deno.land/manual@v1.30.0/examples/file_server
   * @see https://medium.com/deno-the-complete-reference/deno-nuggets-convert-file-to-stream-d6dae2d73192
   * @see https://opis.io/http/3.x/response-types.html
   */
  public fileStream(_file: string): this {
    return this;
  }

  /**
   * Download file
   * TODO: to implement
   * @see https://deno.land/manual@v1.30.0/examples/file_server
   * @see https://stackoverflow.com/questions/61945050/how-can-i-download-big-files-in-deno
   * @see https://medium.com/deno-the-complete-reference/file-download-through-fetch-api-in-deno-771f30b19471
   * @see https://opis.io/http/3.x/response-types.html
   */
  public download(_file: string, _filename: string): this {
    return this;
  }

  /**
   * Redirect response
   * TODO: to implement
   */
  public redirect(): this {
    // TODO: redirect by route name
    // TODO: redirect by url
    // Response.redirect()
    // static redirect(url: string | URL, status?: number): Response;

    return this;
  }

  /**
   * Render Preact or Solid component as response
   */
  public async renderView(
    name: ViewType,
    data?: Record<string, unknown>,
  ): Promise<this> {
    const content = await view.render(name, data ?? this.data.getData());
    this.result = this.buildResponse(content, "text/html");

    return this;
  }

  /**
   * Render View from route definition
   */
  public render(data?: Record<string, unknown>): this {
    if (data) {
      this.data.setData(data);
    }

    this.renderRouteView = true;

    return this;
  }

  public renderNotFound(data?: Record<string, unknown>): this {
    if (data) {
      this.body.setData(data);
    }

    this.notFound = true;

    return this;
  }

  public isNotFound(): boolean {
    return this.notFound;
  }

  public async send(): Promise<Response> {
    if (this.renderRouteView && this.view) {
      await this.renderView(this.view, this.data.getData());
    }

    return this.result;
  }

  public static async renderNotFound(
    error: IException,
    request: HttpRequest,
    response: HttpResponse,
    app: IApp,
  ): Promise<HttpResponse> {
    response.setStatus(HttpStatusType.NotFound).setError(error);
    const notFoundHandler = app.errors.notFound.handler;
    const resp = await notFoundHandler(request, response, app) as HttpResponse;
    const notFoundView = app.errors.notFound.view;

    if (notFoundView) {
      const trim = Helper.trim;
      const viewPath = `${trim(app.directories.views, "/")}/${
        trim(notFoundView, "/")
      }`;
      resp.setView(`${Deno.cwd()}/${viewPath}` as ViewType);
    }

    return resp;
  }

  private getInitOptions(): ResponseInit {
    const status: HttpStatusType = this.status ?? HttpStatusType.OK;

    return {
      headers: this.headers.getNative(),
      status: status,
      statusText: HttpCodeType[status],
    };
  }

  private buildResponse(
    content: string,
    contentType: HeaderContentType,
  ): Response {
    if (!this.status) {
      this.status = HttpStatusType.OK;
    }

    this.headers.contentType(`${contentType}; charset=${this.charset}`);
    return new Response(content, this.getInitOptions());
  }
}
