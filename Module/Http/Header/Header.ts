import { CharsetType, HttpMethodType } from "../types.ts";
import {
  AcceptEncodingType,
  HeaderAcceptType,
  HeaderContentTypeType,
  HeaderKeyType,
  IHeader,
} from "./types.ts";

export class Header implements IHeader {
  public readonly native: Headers;
  private charset: CharsetType = "utf-8";

  constructor(headers?: Headers) {
    if (!headers) {
      headers = new Headers();
    }

    this.native = headers;

    // TODO: handle cache control
  }

  public getCharset(): CharsetType {
    return this.charset;
  }

  public setCharset(value: CharsetType): this {
    this.charset = value;

    return this;
  }

  public get(name: HeaderKeyType): string | null {
    return this.native.get(name);
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

  public getContentType(): HeaderContentTypeType | null {
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

  public getAuthorization(): string | null {
    return this.get("Authorization");
  }

  public setAuthorization(value: string): this {
    this.add("Authorization", value);

    return this;
  }

  public getBasicAuth(): string | null {
    const token = this.get("Authorization");

    if (!token) {
      return null;
    }

    const match = token.match(/Basic +([^, ]+)/);

    if (!match) {
      return null;
    }

    return match[1];
  }

  public setBasicAuth(token: string): this {
    this.add("Authorization", `Basic ${token}`);

    return this;
  }

  public getBearer(): string | null {
    const token = this.get("Authorization");

    if (!token) {
      return null;
    }

    const match = token.match(/Bearer +([^, ]+)/);

    if (!match) {
      return null;
    }

    return match[1];
  }

  public setBearer(token: string): this {
    this.add("Authorization", `Bearer ${token}`);

    return this;
  }

  public isBlob(): boolean {
    const contentType = this.get("Content-Type");

    if (!contentType) {
      return false;
    }

    return /application\/octet-stream/i.test(contentType);
  }

  public blob(): this {
    this.contentType("application/octet-stream");

    return this;
  }

  public isJson(): boolean {
    const contentType = this.get("Content-Type");

    if (!contentType) {
      return false;
    }

    return /application\/(ld\+)?json/i.test(contentType);
  }

  public json(): this {
    this.contentType("application/json");
    this.contentType("application/ld+json");

    return this;
  }

  public isFormData(): boolean {
    const contentType = this.get("Content-Type");

    if (!contentType) {
      return false;
    }

    return /multipart\/form-data/i.test(contentType);
  }

  public formData(): this {
    this.contentType("multipart/form-data");

    return this;
  }

  public isText(): boolean {
    const contentType = this.get("Content-Type");

    if (!contentType) {
      return false;
    }

    return /text\/css|\*|csv|html|plain|xml/i.test(contentType);
  }

  public text(): this {
    this.contentType("text/*");

    return this;
  }

  public contentType(value: HeaderContentTypeType): this {
    this.add("Content-Type", `${value}; charset=${this.charset}`);

    return this;
  }

  public contentLength(length: number): this {
    this.add("Content-Length", `${length}`);

    return this;
  }

  public custom(value: string): this {
    this.add("X-Custom-Header", value);

    return this;
  }

  public append(
    name: HeaderKeyType,
    value: HeaderContentTypeType | AcceptEncodingType,
  ): this {
    this.native.append(name, value);

    return this;
  }

  public add(
    name: HeaderKeyType,
    value: HeaderContentTypeType | AcceptEncodingType,
  ): this {
    this.append(name, value);

    return this;
  }

  public delete(name: HeaderKeyType): this {
    this.native.delete(name);

    return this;
  }

  public forEach(
    callbackFn: (value: string, key: string, parent: Headers) => void,
    thisArg?: unknown,
  ): this {
    this.native.forEach(callbackFn, thisArg);

    return this;
  }

  public clear(): this {
    this.forEach((_value, key) => {
      this.delete(key);
    });

    return this;
  }

  public has(name: HeaderKeyType): boolean {
    return this.native.has(name);
  }

  public keys(): string[] {
    const keys: string[] = [];

    this.forEach((_value, key) => {
      keys.push(key);
    });

    return keys;
  }

  public count(): number {
    return this.keys().length;
  }

  public hasData(): boolean {
    return this.count() > 0;
  }

  public set(name: HeaderKeyType, value: string): this {
    this.native.set(name, value);

    return this;
  }
}
