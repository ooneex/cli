import { Header } from "../Header/mod.ts";
import { Request } from "../Request/mod.ts";
import { Collection, ViewType } from "../deps.ts";
import { HttpStatusType } from "../types.ts";

export interface IResponse {
  readonly data: Collection;
  readonly body: Collection;
  readonly status: HttpStatusType;
  readonly header: Header;
  string: (content: string, status?: HttpStatusType) => Response;
  html: (content: string, status?: HttpStatusType) => Response;
  json: (data: Record<string, unknown>, status?: HttpStatusType) => Response;
  render: <T>(
    view: ViewType<T>,
    data?: T,
    status?: HttpStatusType,
  ) => Promise<Response>;

  notFound(
    message: string,
    request: Request,
    status?: HttpStatusType,
  ): Promise<Response>;
}
