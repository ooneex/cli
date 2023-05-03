import { ICollection } from "../deps.ts";
import { IRoute } from "../Route/types.ts";

export interface IRouter {
  readonly routes: ICollection<string, IRoute>;
  findByName(name: string): IRoute | null;
  findByPathname(url: URL): IRoute | null;
}
