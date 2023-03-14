import { serve } from "../deps.ts";
import { ServerOptionsType } from "../types.ts";

export class HttpServer {
  constructor(public readonly config: ServerOptionsType) {
  }

  public async start(): Promise<void> {
    await serve(this.config.handler, {
      ...this.config,
    });
  }
}
