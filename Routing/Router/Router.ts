import { IRoute } from "../Route/types.ts";
import { ICollection } from "../deps.ts";
import { IRouter } from "./types.ts";

// TODO: generatePath() and generateUrl() methods
export class Router implements IRouter {
  constructor(public readonly routes: ICollection<string, IRoute>) {
  }

  public findByName(name: string): IRoute | null {
    return this.routes.get(name) ?? null;
  }

  public findByPathname(url: URL): IRoute | null {
    let route: IRoute | null = null;

    for (const [_key, value] of this.routes) {
      const pattern = new URLPattern({ pathname: value.getPath() });

      if (pattern.test(url)) {
        route = value;
      }
    }

    return route;
  }
}
