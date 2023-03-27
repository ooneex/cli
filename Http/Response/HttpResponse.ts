import { Collection, IApp, IException, view, ViewType } from "../deps.ts";
import { Header, HeaderContentTypeType } from "../Header/mod.ts";
import { HttpRequest } from "../Request/HttpRequest.ts";
import { HttpCodeType, HttpStatusType } from "../types.ts";
import { IResponse } from "./types.ts";

export class HttpResponse implements IResponse {
  private status: HttpStatusType | null = null;
  private error: IException | null = null;
  private view: ViewType | null = null;
  private notFound = false;
  private response: Response | null = null;
  public readonly data: Collection;
  public readonly body: Collection;
  public readonly header: Header;

  constructor() {
    this.data = new Collection<string, unknown>();
    this.body = new Collection<string, unknown>();
    this.header = new Header(new Headers());
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

  /**
   * Render string response
   */
  public string(content: string): this {
    this.response = this.buildResponse(content, "text/plain");

    return this;
  }

  /**
   * Render html response
   */
  public html(content: string): this {
    this.response = this.buildResponse(content, "text/html");

    return this;
  }

  /**
   * Render json response
   */
  public json(data?: Record<string, unknown>): this {
    if (!data) {
      data = this.body.hasData() ? this.body.getData() : this.data.getData();
    }

    this.response = this.buildResponse(
      JSON.stringify(data),
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
    if (!data) {
      data = this.data.hasData() ? this.data.getData() : this.body.getData();
    }
    const content = await view.render(name, data);
    this.response = this.buildResponse(content, "text/html");

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
    if (this.view) {
      await this.renderView(this.view);
    } else {
      this.json();
    }

    return this.response as Response;
  }

  public static async renderNotFound(
    error: IException | null,
    request: HttpRequest,
    response: HttpResponse,
    app: IApp,
  ): Promise<Response> {
    response.setStatus(HttpStatusType.NotFound);
    if (error) {
      response.setError(error);
    }

    const notFoundHandler = app.errors.notFound.handler;
    response = await notFoundHandler(request, response, app) as HttpResponse;
    const notFoundView = app.errors.notFound.view;

    if (notFoundView) {
      const viewPath = `${app.directories.views}/${notFoundView}`;
      response.setView(viewPath as ViewType);
    }

    return response.send();
  }

  private getInitOptions(): ResponseInit {
    const status: HttpStatusType = this.status ?? HttpStatusType.OK;

    return {
      headers: this.header.native,
      status: status,
      statusText: HttpCodeType[status],
    };
  }

  private buildResponse(
    content: string,
    contentType: HeaderContentTypeType,
  ): Response {
    if (!this.status) {
      this.status = HttpStatusType.OK;
    }

    this.header.contentType(contentType);
    this.header.contentLength(content.length);
    return new Response(content, this.getInitOptions());
  }
}
