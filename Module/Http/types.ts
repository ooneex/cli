/**
 * Map from status code to status text.
 *
 * @example
 *
 * ```ts
 * console.log(HttpStatusType.NotFound); // 404
 * console.log(HttpCodeType[HttpStatusType.NotFound]); // "Not Found"
 * ```
 */
import {
  Status as HttpStatusType,
  STATUS_TEXT as HttpCodeType,
} from "./deps.ts";

export { HttpCodeType, HttpStatusType };

export type HttpMethodType =
  | "CONNECT"
  | "DELETE"
  | "GET"
  | "HEAD"
  | "OPTIONS"
  | "PATCH"
  | "POST"
  | "PUT"
  | "TRACE";

export type HttpProtocolType =
  | "https"
  | "http"
  | "socket"
  | "tcp";

// TODO: set charset in .env file
// TODO: set charset in generated html
export type CharsetType =
  | "utf-8"
  | "iso-8859-1"
  | string;
