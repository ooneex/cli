import { Collection } from "../deps.ts";
import { Route } from "../Route/Route.ts";
import { IRoute, IRouter } from "../types.ts";

export class Router implements IRouter {
  private routeCollection = new Collection<string, Route>();

  public add(route: Route): this {
    this.routeCollection.add(route.getName(), route);

    return this;
  }

  public set(routes: Record<string, Route>): this {
    this.routeCollection.set(routes);

    return this;
  }

  public count(): number {
    return this.routeCollection.count();
  }

  public findByName(name: string): IRoute | undefined {
    return this.routeCollection.get(name);
  }

  public getCollection(): Collection<string, Route> {
    return this.routeCollection;
  }
}
