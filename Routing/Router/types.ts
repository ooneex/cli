import { Collection } from "../deps.ts";
import { IRoute } from "../Route/types.ts";

export interface IRouter {
  readonly collection: Collection<string, IRoute>;

  findByName(name: string): IRoute | null;

  findByPathname(url: URL): IRoute | null;
}
