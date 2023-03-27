import { Header } from "../Http/Header/Header.ts";
import { ClientRequest } from "./ClientRequest.ts";

export class Client extends ClientRequest {
  constructor(baseUrl?: string, header?: Header) {
    super(baseUrl, header);
  }

  public get(url: string | URL, data?: Record<string, unknown>): void {
    this.config.method = "GET";

    if (data) {
      this.data.set(data);
    }
  }

  // TODO: POST PUT DELETE HEAD OPTIONS PATCH TRACE
}
