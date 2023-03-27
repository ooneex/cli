import { CharsetType, HttpMethodType } from "../types.ts";

export interface IHeader {
  readonly native: Headers;
  get: (name: HeaderKeyType) => string | null;
  getAllow: () => HttpMethodType | null;
  getAccept: () => HeaderAcceptType | null;
  getAcceptEncoding: () => AcceptEncodingType | null;
  getContentLength: () => string | null;
  getContentType: () => HeaderContentTypeType | null;
  getUserAgent: () => string | null;
  getAuthorization: () => string | null;
  getBasicAuth: () => string | null;
  getBearer: () => string | null;
  getCookie: () => string | null;
  getHost: () => string | null;
  getReferer: () => string | null;
  getRefererPolicy: () => string | null;
  getServer: () => string | null;
  getCharset: () => CharsetType;
  contentLength: (length: number) => IHeader;
  isBlob: () => boolean;
  isJson: () => boolean;
  isText: () => boolean;
  isFormData: () => boolean;
  has: (name: HeaderKeyType) => boolean;
  keys: () => string[];
  count: () => number;
  hasData: () => boolean;
  forEach: (
    callbackFn: (value: string, key: string, parent: Headers) => void,
    thisArg?: unknown,
  ) => void;
}

export type HeaderContentTypeType = HeaderAcceptType;
export type AcceptEncodingType =
  | "deflate"
  | "gzip"
  | "compress"
  | "br"
  | "identity"
  | "*"
  | string;

export type HeaderKeyType =
  | "Accept"
  | "Accept-Charset"
  | "Accept-Encoding"
  | "Accept-Language"
  | "Access-Control-Allow-Credentials"
  | "Access-Control-Allow-Headers"
  | "Access-Control-Allow-Methods"
  | "Access-Control-Allow-Origin"
  | "Access-Control-Expose-Headers"
  | "Access-Control-Max-Age"
  | "Access-Control-Request-Headers"
  | "Access-Control-Request-Method"
  | "Age"
  | "Allow"
  | "Authorization"
  | "Cache-Control"
  | "Clear-Site-Data"
  | "Connection"
  | "Content-Disposition"
  | "Content-Encoding"
  | "Content-Language"
  | "Content-Length"
  | "Content-Location"
  | "Content-Range"
  | "Content-Security-Policy"
  | "Content-Security-Policy-Report-Only"
  | "Content-Type"
  | "Cookie"
  | "Cross-Origin-Embedder-Policy"
  | "Cross-Origin-Opener-Policy"
  | "Cross-Origin-Resource-Policy"
  | "Date"
  | "Digest"
  | "ETag"
  | "Expect"
  | "Expires"
  | "Forwarded"
  | "From"
  | "Host"
  | "If-Match"
  | "If-Modified-Since"
  | "If-None-Match"
  | "If-Range"
  | "If-Unmodified-Since"
  | "Keep-Alive"
  | "Last-Modified"
  | "Link"
  | "Location"
  | "Max-Forwards"
  | "Origin"
  | "Permissions-Policy"
  | "Proxy-Authenticate"
  | "Proxy-Authorization"
  | "Range"
  | "Referer"
  | "Referrer-Policy"
  | "Retry-After"
  | "Sec-Fetch-Dest"
  | "Sec-Fetch-Mode"
  | "Sec-Fetch-Site"
  | "Sec-Fetch-User"
  | "Sec-WebSocket-Accept"
  | "Server"
  | "Server-Timing"
  | "Service-Worker-Navigation-Preload"
  | "Set-Cookie"
  | "SourceMap"
  | "Strict-Transport-Security"
  | "TE"
  | "Timing-Allow-Origin"
  | "Trailer"
  | "Transfer-Encoding"
  | "Upgrade"
  | "Upgrade-Insecure-Requests"
  | "User-Agent"
  | "Vary"
  | "Via"
  | "WWW-Authenticate"
  | "Want-Digest"
  | "X-API-KEY"
  | "X-Content-Type-Options"
  | "X-Custom-Header"
  | "X-Frame-Options"
  | string;

export type HeaderAcceptType =
  | "*/*"
  | "application/*"
  | "application/EDI-X12"
  | "application/EDIFACT"
  | "application/javascript"
  | "application/octet-stream"
  | "application/ogg"
  | "application/pdf"
  | "application/xhtml+xml"
  | "application/x-shockwave-flash"
  | "application/json"
  | "application/ld+json"
  | "application/xml"
  | "application/zip"
  | "application/x-www-form-urlencoded"
  | "audio/*"
  | "audio/mpeg"
  | "audio/x-ms-wma"
  | "audio/vnd.rn-realaudio"
  | "audio/x-wav"
  | "image/*"
  | "image/gif"
  | "image/jpeg"
  | "image/png"
  | "image/tiff"
  | "image/vnd.microsoft.icon"
  | "image/x-icon"
  | "image/vnd.djvu"
  | "image/svg+xml"
  | "multipart/*"
  | "multipart/mixed"
  | "multipart/alternative"
  | "multipart/related"
  | "multipart/form-data"
  | "text/css"
  | "text/*"
  | "text/csv"
  | "text/html"
  | "text/plain"
  | "text/xml"
  | "video/*"
  | "video/mpeg"
  | "video/mp4"
  | "video/quicktime"
  | "video/x-ms-wmv"
  | "video/x-msvideo"
  | "video/x-flv"
  | "video/webm"
  | "application/vnd.oasis.opendocument.text"
  | "application/vnd.oasis.opendocument.spreadsheet"
  | "application/vnd.oasis.opendocument.presentation"
  | "application/vnd.oasis.opendocument.graphics"
  | "application/vnd.ms-excel"
  | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  | "application/vnd.ms-powerpoint"
  | "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  | "application/msword"
  | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  | "application/vnd.mozilla.xul+xml"
  | string;
