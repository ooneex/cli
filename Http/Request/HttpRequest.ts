import { Helper } from "../deps.ts";
import { Header, IHeader } from "../Header/mod.ts";
import { HttpMethodType } from "../types.ts";
import { RequestBodyParserException } from "./RequestBodyParserException.ts";
import { IRequest, UrlPatternType } from "./types.ts";

export class HttpRequest implements IRequest {
  public readonly url: URL;
  public readonly header: IHeader;
  public readonly search: URLSearchParams;

  constructor(public readonly native: Request) {
    this.url = new URL(native.url);
    this.url.pathname = decodeURIComponent(this.url.pathname);
    this.header = new Header(native.headers);
    this.search = this.url.searchParams;
  }

  public getMethod(): HttpMethodType {
    return this.native.method as HttpMethodType;
  }

  public isFormData(): boolean {
    return this.header.isFormData();
  }

  public isJson(): boolean {
    return this.header.isJson();
  }

  public isText(): boolean {
    return this.header.isText();
  }

  // TODO: arrayBuffer() blob()
  // TODO: check for bodyUsed
  public async getBody<T = Record<string, unknown>>(): Promise<
    T | string | FormData | null
  > {
    // TODO: check if body is null

    try {
      if (this.isJson()) {
        return await this.native.json();
      }

      if (this.isText()) {
        return await this.native.text();
      }

      if (this.isFormData()) {
        return await this.native.formData();
      }
    } catch (e) {
      throw new RequestBodyParserException(e.message);
    }

    return null;
  }

  /**
   * Check if an url pattern (like /books/:id) matches with this request
   */
  public getParams<T = Record<string, string>>(
    pattern: UrlPatternType,
  ): T | null {
    const urlPattern = new URLPattern({ pathname: pattern });
    const match = urlPattern.exec(this.url);

    if (!match) {
      return null;
    }

    const params = match.pathname.groups;

    if (Helper.isEmpty(params)) {
      return null;
    }

    return (match.pathname.groups as T) ?? null;
  }
}
