import { CharsetType } from "../types.ts";
import { ReadonlyHeader } from "./ReadonlyHeader.ts";
import {
  AcceptEncodingType,
  HeaderContentTypeType,
  HeaderKeyType,
  IHeader,
} from "./types.ts";

export class Header extends ReadonlyHeader implements IHeader {
  public readonly native: Headers;

  constructor(headers?: Headers) {
    if (!headers) {
      headers = new Headers();
    }

    super(headers);

    this.native = headers;

    // TODO: handle cache control
  }

  public setCharset(value: CharsetType): this {
    this.charset = value;

    return this;
  }

  public setAuthorization(value: string): this {
    this.add("Authorization", value);

    return this;
  }

  public setBasicAuth(token: string): this {
    this.add("Authorization", `Basic ${token}`);

    return this;
  }

  public setBearer(token: string): this {
    this.add("Authorization", `Bearer ${token}`);

    return this;
  }

  public blob(): this {
    this.contentType("application/octet-stream");

    return this;
  }

  public json(): this {
    this.contentType("application/json");
    this.contentType("application/ld+json");

    return this;
  }

  public stream(): this {
    this.contentType("application/octet-stream");

    return this;
  }

  public formData(): this {
    this.contentType("multipart/form-data");

    return this;
  }

  public text(): this {
    this.contentType("text/*");

    return this;
  }

  public contentType(value: HeaderContentTypeType): this {
    this.add("Content-Type", `${value}; charset=${this.charset}`);

    return this;
  }

  public contentDisposition(value: string): this {
    this.add("Content-Disposition", `${value}`);

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

  public clear(): this {
    this.forEach((_value, key) => {
      this.delete(key);
    });

    return this;
  }

  public set(name: HeaderKeyType, value: string): this {
    this.native.set(name, value);

    return this;
  }
}
