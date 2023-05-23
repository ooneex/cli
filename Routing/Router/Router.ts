import { IRoute } from "../Route/types.ts";
import { get, ICollection } from "../deps.ts";
import { UrlGenerationException } from "./UrlGenerationException.ts";
import { IRouter } from "./types.ts";

export class Router implements IRouter {
  public readonly id: string = crypto.randomUUID();

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

  public generateUrl(
    name: string,
    params: Record<string, string | number> = {},
  ): void {
    const route = this.findByName(name);

    if (!route) {
      throw new UrlGenerationException(`Cannot found route "${name}"`);
    }

    params = { ...(route.getDefault()), ...params };

    const K = get<{ Route: { Matched: symbol } }>(this.id);
    console.log("🚀 ~ file: Router.ts:43 ~ Router ~ K:", K);
    console.log(route);
  }
}
