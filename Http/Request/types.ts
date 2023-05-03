import { ReadonlyHeader } from "../Header/mod.ts";
import { HttpMethodType } from "../types.ts";

export interface IRequest {
  readonly url: Readonly<URL> | null;
  readonly header: ReadonlyHeader | null;
  readonly search: Readonly<URLSearchParams> | null;
  readonly native: Request | null;
  current: () => this | null;
  getMethod: () => HttpMethodType | null;
  isJson: () => boolean;
  isText: () => boolean;
  isFormData: () => boolean;
  getBody: <T = Record<string, unknown>>() => Promise<
    T | string | FormData | null
  >;
}

export type UrlPatternType = `/${string}`;
