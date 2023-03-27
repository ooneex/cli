import { ICollection } from "../Collection/mod.ts";
import { HttpStatusType, IHeader } from "../Http/mod.ts";
import { IException } from "../Exception/mod.ts";
import { ClientResponseType } from "./types.ts";

export class ClientResponse {
  public readonly status: HttpStatusType;
  public readonly text: string;
  public readonly error: IException | null;
  public readonly data: ICollection | null;
  public readonly form: Readonly<FormData> | null;
  public readonly url: Readonly<URL> | null;
  public readonly header: IHeader;
  public readonly native: Readonly<Response>;

  constructor(response: ClientResponseType) {
    this.status = response.status;
    this.text = response.text;
    this.error = response.error;
    this.data = response.data;
    this.form = response.form;
    this.url = response.url;
    this.header = response.header;
    this.native = response.native;
  }
}
