import { Collection, IException, ViewType } from "../deps.ts";
import { Header } from "../Header/Header.ts";
import { HttpStatusType } from "../types.ts";

export interface IResponse extends IHandlerResponse {
  send: () => Response | Promise<Response>;
}

export interface IHandlerResponse extends IBaseResponse {
  renderNotFound: (data?: Record<string, unknown>) => this;
  setError: (error: IException | null) => this;
  setView: (view: ViewType | null) => this;
  setStatus: (status: HttpStatusType) => this;
  setCharset: (value: CharsetType) => this;
  isNotFound: () => boolean;
  getError: () => IException | null;
}

export interface IServerErrorResponse extends IBaseResponse {
  getError: () => IException | null;
}

export interface INotFoundResponse extends IBaseResponse {
  getError: () => IException | null;
}

export interface IBaseResponse {
  readonly data: Collection;
  readonly body: Collection;
  readonly headers: Header;
  getView: () => ViewType | null;
  getStatus: () => HttpStatusType | null;
  getCharset: () => CharsetType;
  string: (content: string) => this;
  html: (content: string) => this;
  json: (data?: Record<string, unknown>) => this;
  renderView: (name: ViewType, data: Record<string, unknown>) => Promise<this>;
}

export type CharsetType = "utf-8" | string;
