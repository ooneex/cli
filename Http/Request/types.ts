import { HttpMethodType } from "../types.ts";

export interface IRequest {
  readonly nativeRequest: Request;
  getMethod: () => HttpMethodType;
  isJson: () => boolean;
  isText: () => boolean;
  isFormData: () => boolean;
  getBody: <T = Record<string, unknown>>() => Promise<
    T | string | FormData | null
  >;
}

export type UrlPatternType = `/${string}`;
