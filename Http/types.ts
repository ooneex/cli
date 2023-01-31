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
import { Status as HttpStatus, STATUS_TEXT as HttpCode } from "./deps.ts";

export type HttpMethodType =
  | "DELETE"
  | "GET"
  | "HEAD"
  | "OPTIONS"
  | "PATCH"
  | "POST"
  | "PUT";

export const HttpDefaultMethods: HttpMethodType[] = [
  "DELETE",
  "GET",
  "HEAD",
  "OPTIONS",
  "PATCH",
  "POST",
  "PUT",
];

export { HttpCode, HttpStatus };

export type HttpProtocolType =
  | "https"
  | "http"
  | "socket"
  | "tcp";

export const HttpDefaultProtocols: HttpProtocolType[] = [
  "https",
  "http",
  "socket",
  "tcp",
];
