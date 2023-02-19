import { HttpMethodType } from "../types.ts";
import {
  AcceptEncodingType,
  HeaderAcceptType,
  HeaderContentType,
  HeaderKeyType,
  IHeader,
} from "./types.ts";

export class Header implements IHeader {
  constructor(private readonly headers: Headers) {
  }

  public get(name: HeaderKeyType): string | null {
    return this.headers.get(name);
  }

  public getAccept(): HeaderAcceptType | null {
    return this.get("Accept");
  }

  public getAcceptEncoding(): AcceptEncodingType | null {
    return this.get("Accept-Encoding");
  }

  public getAllow(): HttpMethodType | null {
    return this.get("Allow") as HttpMethodType;
  }

  public getContentLength(): string | null {
    return this.get("Content-Length");
  }

  public getContentType(): HeaderContentType | null {
    return this.get("Content-Type");
  }

  public getCookie(): string | null {
    return this.get("Cookie");
  }

  public getHost(): string | null {
    return this.get("Host");
  }

  public getReferer(): string | null {
    return this.get("Referer");
  }

  public getRefererPolicy(): string | null {
    return this.get("Referrer-Policy");
  }

  public getServer(): string | null {
    return this.get("Server");
  }

  public getUserAgent(): string | null {
    return this.get("User-Agent");
  }

  public isJson(): boolean {
    const contentType = this.get("Content-Type");

    if (!contentType) {
      return false;
    }

    return /application\/(ld\+)?json/.test(contentType);
  }

  public isFormData(): boolean {
    const contentType = this.get("Content-Type");

    if (!contentType) {
      return false;
    }

    return /multipart\/form-data/.test(contentType);
  }

  public isText(): boolean {
    const contentType = this.get("Content-Type");

    if (!contentType) {
      return false;
    }

    return /text\/css|\*|csv|html|plain|xml/.test(contentType);
  }

  public append(
    name: HeaderKeyType,
    value: HeaderContentType | AcceptEncodingType,
  ): this {
    this.headers.append(name, value);

    return this;
  }

  public add(
    name: HeaderKeyType,
    value: HeaderContentType | AcceptEncodingType,
  ): this {
    this.append(name, value);

    return this;
  }

  public contentType(value: HeaderContentType): this {
    this.headers.append("Content-Type", value);

    return this;
  }

  public delete(name: HeaderKeyType): this {
    this.headers.delete(name);

    return this;
  }

  public forEach(
    callbackFn: (value: string, key: string, parent: Headers) => void,
    thisArg: unknown | undefined,
  ): this {
    this.headers.forEach(callbackFn, thisArg);

    return this;
  }

  public has(name: HeaderKeyType): boolean {
    return this.headers.has(name);
  }

  public set(name: HeaderKeyType, value: string): this {
    this.headers.set(name, value);

    return this;
  }

  public getNative(): Headers {
    return this.headers;
  }
}
