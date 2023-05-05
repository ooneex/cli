import { Helper } from "../deps.ts";
import { ReadonlyHeader } from "../Header/mod.ts";
import { HttpMethodType } from "../types.ts";
import { RequestBodyParserException } from "./RequestBodyParserException.ts";
import { IRequest, UrlPatternType } from "./types.ts";

export class HttpRequest implements IRequest {
  public readonly url: Readonly<URL> | null;
  public readonly header: ReadonlyHeader | null;
  public readonly search: Readonly<URLSearchParams> | null;

  constructor(public readonly native: Request | null = null) {
    this.url = null;
    this.header = null;
    this.search = null;

    if (native) {
      this.url = new URL(native.url);
      // this.url.pathname = decodeURIComponent(this.url.pathname);
      this.header = new ReadonlyHeader(native.headers);
      this.search = this.url.searchParams;
    }
  }

  public getMethod(): HttpMethodType | null {
    if (!this.native) {
      return null;
    }

    return this.native.method as HttpMethodType;
  }

  public isFormData(): boolean {
    if (!this.header) {
      return false;
    }

    return this.header.isFormData();
  }

  public isJson(): boolean {
    if (!this.header) {
      return false;
    }

    return this.header.isJson();
  }

  public isText(): boolean {
    if (!this.header) {
      return false;
    }

    return this.header.isText();
  }

  // TODO: arrayBuffer() blob()
  // TODO: check for bodyUsed
  public async getBody<T = Record<string, unknown>>(): Promise<
    T | string | FormData | null
  > {
    // TODO: check if body is null

    try {
      if (this.native && this.isJson()) {
        return await this.native.json();
      }

      if (this.native && this.isText()) {
        return await this.native.text();
      }

      if (this.native && this.isFormData()) {
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
    if (!this.url) {
      return null;
    }

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
