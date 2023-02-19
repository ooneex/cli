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
  ConnInfo,
  Status as HttpStatusType,
  STATUS_TEXT as HttpCodeType,
} from "./deps.ts";

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

export { HttpCodeType, HttpStatusType };

export type HttpProtocolType =
  | "https"
  | "http"
  | "socket"
  | "tcp";

export type ServerOptionsType = {
  port?: number;
  hostname?: string;
  handler: (
    request: Request,
    connInfo: ConnInfo,
  ) => Response | Promise<Response>;
  onError?: (error: unknown) => Response | Promise<Response>;
  onListen?: (params: { hostname: string; port: number }) => void;
  signal?: AbortSignal;
  /** Server private key in PEM format */
  key?: string;
  /** Cert chain in PEM format */
  cert?: string;
  /** The path to the file containing the TLS private key. */
  keyFile?: string;
  /** The path to the file containing the TLS certificate */
  certFile?: string;
};
