import { IHeaderChecker } from "./types.ts";

export abstract class HeaderChecker implements IHeaderChecker {
  protected _native: Headers;

  constructor(headers: Headers) {
    this._native = headers;
  }

  public isBlob(): boolean {
    const contentType = this._native.get("Content-Type");

    if (!contentType) {
      return false;
    }

    return /application\/octet-stream/i.test(contentType);
  }

  public isJson(): boolean {
    const contentType = this._native.get("Content-Type");

    if (!contentType) {
      return false;
    }

    return /application\/(ld\+)?json/i.test(contentType);
  }

  public isFormData(): boolean {
    const contentType = this._native.get("Content-Type");

    if (!contentType) {
      return false;
    }

    return /multipart\/form-data/i.test(contentType);
  }

  public isText(): boolean {
    const contentType = this._native.get("Content-Type");

    if (!contentType) {
      return false;
    }

    return /text\/css|\*|csv|html|plain|xml/i.test(contentType);
  }

  public isStream(): boolean {
    const contentType = this._native.get("Content-Type");

    if (!contentType) {
      return false;
    }

    return /application\/octet-stream/i.test(contentType);
  }
}
