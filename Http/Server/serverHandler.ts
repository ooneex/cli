import {
  ConnInfo,
  EnvHelper,
  get,
  Keys,
  LocaleType,
  MatchedRoute,
  MatchedRouteType,
  registerConstant,
  RouteChecker,
  Router,
  VersionType,
} from "../deps.ts";
import { HttpRequest } from "../Request/HttpRequest.ts";
import { UrlPatternType } from "../Request/types.ts";
import { HttpResponse } from "../Response/HttpResponse.ts";
import { HttpMethodType } from "../types.ts";

export const serverHandler = async (
  req: Request,
  connInfo: ConnInfo,
): Promise<Response> => {
  const request = new HttpRequest(req);
  registerConstant(Keys.Request, request);
  const response = new HttpResponse();
  registerConstant(Keys.Response, response);
  // const pathname = decodeURIComponent(request.url.pathname);
  const router = get<Router>(Keys.Router);
  const route = router.findByPathname(request.url as Readonly<URL>);

  if (!route) {
    return await response.notFound(
      `Route ${(request.url as Readonly<URL>).pathname} not found`,
    );
  }

  registerConstant(Keys.Route.Default, route);

  const envHelper = get<EnvHelper>(Keys.Env.Helper);

  const params = request.getParams(route.getPath() as UrlPatternType);
  registerConstant(Keys.Route.Params, params ?? {});

  const matchedRoute: MatchedRouteType = {
    name: route.getName(),
    url: request.url as URL,
    params: params,
    method: request.getMethod() as HttpMethodType,
    // @ts-ignore: trust me
    ip: connInfo.localAddr.hostname,
    locale: envHelper.getLocale() as LocaleType,
    env: envHelper.getAppEnv() as string,
    version: envHelper.getVersion() as VersionType,
  };

  const routeChecker = new RouteChecker(route, new MatchedRoute(matchedRoute));
  if (!routeChecker.isValid()) {
    const constraintErrors = routeChecker.getErrors();
    const constraintError = constraintErrors[0];

    return await response.notFound(
      constraintError.message,
      constraintError.status,
    );
  }

  const controller = route.getController();

  return await controller();
};
