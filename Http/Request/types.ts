import { IHeader } from "../Header/mod.ts";
import { HttpMethodType } from "../types.ts";

export interface IRequest {
  readonly url: URL;
  readonly header: IHeader;
  readonly search: URLSearchParams;
  readonly native: Request;
  getMethod: () => HttpMethodType;
  isJson: () => boolean;
  isText: () => boolean;
  isFormData: () => boolean;
  getBody: <T = Record<string, unknown>>() => Promise<
    T | string | FormData | null
  >;
}

export type UrlPatternType = `/${string}`;
