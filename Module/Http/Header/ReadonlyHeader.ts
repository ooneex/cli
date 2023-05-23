import { CharsetType, HttpMethodType } from "../types.ts";
import { HeaderChecker } from "./HeaderChecker.ts";
import {
  AcceptEncodingType,
  HeaderAcceptType,
  HeaderContentTypeType,
  HeaderKeyType,
  IReadonlyHeader,
} from "./types.ts";

export class ReadonlyHeader extends HeaderChecker implements IReadonlyHeader {
  protected charset: CharsetType = "utf-8";

  constructor(headers: Headers) {
    super(headers);

    // TODO: handle cache control
  }

  public getCharset(): CharsetType {
    return this.charset;
  }

  public get(name: HeaderKeyType): string | null {
    return this._native.get(name);
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

  public getContentDisposition(): string | null {
    return this.get("Content-Disposition");
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

  public forEach(
    callbackFn: (value: string, key: string, parent: Headers) => void,
    thisArg?: unknown,
  ): this {
    this._native.forEach(callbackFn, thisArg);

    return this;
  }

  public has(name: HeaderKeyType): boolean {
    return this._native.has(name);
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
}
