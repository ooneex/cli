import { Helper } from "../deps.ts";
import { Header } from "../Header/Header.ts";
import { IHeader } from "../Header/types.ts";
import { HttpMethodType } from "../types.ts";
import { RequestBodyParserException } from "./RequestBodyParserException.ts";
import { IRequest, UrlPatternType } from "./types.ts";

export class HttpRequest implements IRequest {
  public readonly url: URL;
  public readonly headers: IHeader;
  public readonly search: URLSearchParams;

  constructor(public readonly nativeRequest: Request) {
    this.url = new URL(nativeRequest.url);
    this.headers = new Header(nativeRequest.headers);
    this.search = this.url.searchParams;
  }

  public getMethod(): HttpMethodType {
    return this.nativeRequest.method as HttpMethodType;
  }

  public isFormData(): boolean {
    return this.headers.isFormData();
  }

  public isJson(): boolean {
    return this.headers.isJson();
  }

  public isText(): boolean {
    return this.headers.isText();
  }

  // TODO: arrayBuffer() blob()
  public async getBody<T = Record<string, unknown>>(): Promise<
    T | string | FormData | null
  > {
    try {
      if (this.isJson()) {
        return await this.nativeRequest.json();
      }

      if (this.isText()) {
        return await this.nativeRequest.text();
      }

      if (this.isFormData()) {
        return await this.nativeRequest.formData();
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
