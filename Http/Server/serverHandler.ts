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
  serveFile,
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
  const pathname = request.url?.pathname;

  if (pathname && /^\/public\/.+/i.test(pathname)) {
    const path = `${Deno.cwd()}${pathname}`;

    return await serveFile(req, path);
  }

  const K = {
    Response: Symbol.for(`response-${crypto.randomUUID()}`),
    Route: {
      Default: Symbol.for(`route-default-${crypto.randomUUID()}`),
      Params: Symbol.for(`route-params-${crypto.randomUUID()}`),
      Matched: Symbol.for(`route-matched-${crypto.randomUUID()}`),
    },
    Exception: Symbol.for(`exception-${crypto.randomUUID()}`),
  };
  registerConstant(request.id, K);

  const response = new HttpResponse();
  registerConstant(K.Response, response);
  // const pathname = decodeURIComponent(request.url.pathname);
  const router = get<Router>(Keys.Router);
  const route = router.findByPathname(request.url as Readonly<URL>);
  registerConstant(K.Route.Default, route);

  if (!route) {
    return await response.notFound(
      `Route ${(request.url as Readonly<URL>).pathname} not found`,
      request,
    );
  }

  const envHelper = get<EnvHelper>(Keys.Env.Helper);

  const params = request.getParams(route.getPath() as UrlPatternType);
  registerConstant(K.Route.Params, params ?? {});

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

  registerConstant(K.Route.Matched, matchedRoute);

  const routeChecker = new RouteChecker(route, new MatchedRoute(matchedRoute));
  if (!routeChecker.isValid()) {
    const constraintErrors = routeChecker.getErrors();
    const constraintError = constraintErrors[0];

    return await response.notFound(
      constraintError.message,
      request,
      constraintError.status,
    );
  }

  const controller = route.getController();

  return await controller(request);
};
