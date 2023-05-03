import { ConnInfo } from "../deps.ts";

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
