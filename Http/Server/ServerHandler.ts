import {
  ConnInfo,
  IApp,
  MatchedRoute,
  MatchedRouteType,
  RouteChecker,
  RouteNotFoundException,
} from "../deps.ts";
import { HttpRequest } from "../Request/HttpRequest.ts";
import { UrlPatternType } from "../Request/types.ts";
import { HttpResponse } from "../Response/HttpResponse.ts";

export const ServerHandler = async (
  req: Request,
  app: IApp,
  connInfo: ConnInfo,
): Promise<Response> => {
  const request = new HttpRequest(req);
  let response = new HttpResponse();
  const route = app.router.findByPathname(request.url);

  if (!route) {
    const error = new RouteNotFoundException(
      `Route ${request.url.pathname} not found`,
    );

    return await HttpResponse.renderNotFound(error, request, response, app);
  }

  const params = request.getParams(route.getPath() as UrlPatternType);
  const matchedRoute: MatchedRouteType = {
    name: route.getName(),
    url: request.url,
    params: params,
    method: request.getMethod(),
    // @ts-ignore:
    ip: connInfo.localAddr.hostname,
    locale: app.env.getLocale(),
    env: app.env.getAppEnv(),
    version: app.env.getVersion(),
  };

  const routeChecker = new RouteChecker(route, new MatchedRoute(matchedRoute));
  if (!routeChecker.isValid()) {
    const error = new RouteNotFoundException(
      `Route ${request.url.pathname} not found`,
    );
    error.setData(routeChecker.getErrors());

    return await HttpResponse.renderNotFound(error, request, response, app);
  }

  const handler = route.getHandler();
  response = handler(request, response, app) as HttpResponse;
  const view = route.getView();

  if (view) {
    response.setView(`${app.directories.views}/${view}`);
  }

  if (response.isNotFound()) {
    return await HttpResponse.renderNotFound(
      response.getError(),
      request,
      response,
      app,
    );
  }

  return await response.send();
};
