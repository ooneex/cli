import { RouteChecker } from "../Checker/RouteChecker.ts";
import { get, Helper, ICollection } from "../deps.ts";
import { MatchedRoute } from "../Matched/MatchedRoute.ts";
import { MatchedRouteType } from "../Matched/types.ts";
import { IRoute } from "../Route/types.ts";
import { IRouter } from "./types.ts";
import { UrlGenerationException } from "./UrlGenerationException.ts";

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
    routeName: string,
    params: Record<string, string | number> = {},
  ): string {
    const route = this.findByName(routeName);

    if (!route) {
      throw new UrlGenerationException(`Cannot found route "${name}"`);
    }

    params = { ...(route.getDefault()), ...params };

    const K = get<{ Route: { Matched: symbol } }>(this.id);

    let matched = get<MatchedRouteType>(K.Route.Matched);
    matched = { ...matched, params };

    const routeChecker = new RouteChecker(route, new MatchedRoute(matched));
    if (!routeChecker.isValid()) {
      const constraintErrors = routeChecker.getErrors();
      const constraintError = constraintErrors[0];
      throw new UrlGenerationException(constraintError.message);
    }

    const path = route.getPath().replace(
      /:+([a-z0-9_-]+)/i,
      (_match, param) => {
        if (!Helper.hasProperty(params, param)) {
          throw new UrlGenerationException(`Param "${param}" not defined`);
        }

        return `${params[param]}`;
      },
    );

    return `${matched.url.protocol}//${matched.url.host}${path}`;
  }
}
