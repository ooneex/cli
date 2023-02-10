import { Collection } from "../deps.ts";
import { IRoute } from "../Route/types.ts";
import { IRouter } from "./types.ts";

export class Router implements IRouter {
  public readonly collection = new Collection<string, IRoute>();

  public findByName(name: string): IRoute | null {
    return this.collection.get(name) ?? null;
  }

  public findByPathname(url: URL): IRoute | null {
    const routes = this.collection.values();

    const route = routes.find((r) => {
      const pattern = new URLPattern({ pathname: r.getPath() });

      return pattern.test(url);
    });

    return route ?? null;
  }
}
