import { Collection, ICollection } from "../Collection/mod.ts";
import { IException } from "../Exception/mod.ts";
import { HttpMethodType, HttpStatusType, IHeader } from "../Http/mod.ts";

export interface IClientRequest {
  readonly baseUrl: string | null;
  readonly header: IHeader;
  readonly config: RequestInit;
  readonly data: Collection;
  readonly abortController: AbortController;
  getCache: () => RequestCache;
  getMethod: () => HttpMethodType;
  abort: (reason?: string) => IClientRequest;
  isJson: () => boolean;
  isText: () => boolean;
  isFormData: () => boolean;
}

export type ClientResponseType = {
  status: HttpStatusType;
  text: string;
  error: IException | null;
  data: ICollection | null;
  form: FormData | null;
  url: URL | null;
  header: IHeader;
  native: Response;
};
