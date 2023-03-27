import { Collection } from "../Collection/mod.ts";
import {IException} from "../Exception/types.ts";
import { Helper } from "../Helper/mod.ts";
import { Header, HttpMethodType } from "../Http/mod.ts";
import {BlobBodyParserException} from "./BlobBodyParserException.ts";
import {ClientResponse} from "./ClientResponse.ts";
import {FormDataBodyParserException} from "./FormDataBodyParserException.ts";
import {JsonBodyParserException} from "./JsonBodyParserException.ts";
import {TextBodyParserException} from "./TextBodyParserException.ts";
import { IClientRequest } from "./types.ts";

export class ClientRequest implements IClientRequest {
  public readonly baseUrl: string | null;
  public readonly header: Header;
  /**
   * Initial options for the request
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Request
   */
  public readonly config: RequestInit;
  public readonly data: Collection;
  public readonly form: FormData;
  public readonly abortController: AbortController;

  constructor(baseUrl?: string, header?: Header) {
    this.baseUrl = baseUrl ?? null;
    this.header = header ?? new Header();
    this.data = new Collection<string, unknown>();
    this.form = new FormData();
    this.abortController = new AbortController();

    this.config = {
      headers: this.header.native,
      cache: "default",
      method: "GET",
      body: null,
      signal: this.abortController.signal,
    };
  }

  public getCache(): RequestCache {
    return this.config.cache ?? "default";
  }

  public getMethod(): HttpMethodType {
    return (this.config.method as HttpMethodType) ?? "GET";
  }

  public abort(reason?: string): this {
    this.abortController.abort(reason);

    return this;
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

  public send(url: string | URL): boolean {
    if (this.data.hasData()) {
      this.header.delete("Content-Type");
      this.header.json();
      this.config.body = JSON.stringify(this.data.getData());
    }

    // TODO: make unit test
    // @ts-ignore: trust me
    if (!Helper.isEmpty(this.form.keys())) {
      this.header.delete("Content-Type");
      this.header.formData();
      this.config.method = "POST";
      this.config.body = this.form;
    }

    this.config.headers = this.header.native;

    if (Helper.isString(url)) {
      url = new URL(url, this.baseUrl ?? undefined);
    }

    const request = new Request(url, this.config);

    // TODO: add events
    fetch(request)
      .then((response) => {
        const status = response.status;
        const text = response.statusText;
        const error: IException | null = null;
        const data = null;
        const form: FormData | null = null;
        const url: URL | null = null;
        const header = new Header(response.headers);
        const collection = new Collection<string, unknown>();

        if (header.isJson()) {
          return response.json().then((result) => {
            collection.setData(result);

            return new ClientResponse({
              status, text, error, data: collection, form, url, header, native: response
            })
          }).catch((reason) => {
            throw new JsonBodyParserException(reason, {status, text, native: response});
          })
        }

        if (header.isText()) {
          return response.text().then((result) => {
            collection.setData({content: result});

            return new ClientResponse({
              status, text, error, data: collection, form, url, header, native: response
            })
          }).catch((reason) => {
            throw new TextBodyParserException(reason, {status, text, native: response});
          })
        }

        if (header.isFormData()) {
          return response.formData().then((result) => {
            return new ClientResponse({
              status, text, error, data, form: result, url, header, native: response
            })
          }).catch((reason) => {
            throw new FormDataBodyParserException(reason, {status, text, native: response});
          })
        }

        if (header.isBlob()) {
          return response.blob().then((result) => {
            const url = new URL(URL.createObjectURL(result));

            return new ClientResponse({
              status, text, error, data, form, url , header, native: response
            })
          }).catch((reason) => {
            throw new BlobBodyParserException(reason, {status, text, native: response});
          })
        }

        // TODO: return default response with native data

      })
      .catch((reason) => {
        // TODO: return promise with response object
      });

    return true;
  }
}
