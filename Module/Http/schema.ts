import { z } from "./deps.ts";

export const HttpMethodSchema = z.enum([
  "CONNECT",
  "DELETE",
  "GET",
  "HEAD",
  "OPTIONS",
  "PATCH",
  "POST",
  "PUT",
  "TRACE",
]);

export const HttpProtocolSchema = z.enum([
  "https",
  "http",
  "socket",
  "tcp",
  "ftp",
]);
