import { app } from "../App.ts";
import {
  Handler,
  HandlerContext,
  HttpMethodType,
  MatchedRoute,
  RouteChecker,
  RouteNotFoundException,
  Router,
} from "../deps.ts";
import { AppStateType } from "../types.ts";
import { HandlerNotFoundException } from "./HandlerNotFoundException.ts";

export const ProxyHandler: Handler = async (
  req: Request,
  ctx: HandlerContext,
) => {
  const state: AppStateType = app.getState() as AppStateType;
  const url = new URL(req.url);
  const router = state.router as Router;
  const route = router.findByPathname(url);

  if (!route) {
    state.error = new RouteNotFoundException(
      `Route '${url.pathname}' not found`,
    );
    app.setState(state);

    return await handleResponse(req, ctx, state);
  }

  state.routeDefinition = route.definition;

  const matchedRoute = new MatchedRoute({
    name: route.getName(),
    url: url,
    params: ctx.params,
    method: req.method as HttpMethodType,
    // @ts-ignore: trust me
    ip: ctx.localAddr.hostname,
    locale: state.env.getLocale(),
    env: state.env.getAppEnv(),
    version: state.env.getVersion() ?? undefined,
  });

  state.matchedRoute = matchedRoute.matched;
  app.setState(state);

  const routeChecker = new RouteChecker(route, matchedRoute);
  if (!routeChecker.isValid()) {
    const exception = new RouteNotFoundException(`Route validation failed`);
    exception.setData(routeChecker.getErrors());
    state.error = exception;
    app.setState(state);

    return await handleResponse(req, ctx, state);
  }

  const handler = route.getHandler();
  const view = route.getView();

  if (!handler && !view) {
    state.error = new HandlerNotFoundException(`Handler not found`);
    app.setState(state);

    return await handleResponse(req, ctx, state);
  }

  let response: Response | null = null;

  if (handler) {
    ctx.state.app = state;
    response = await handler(req, ctx);
  }

  if (!response) {
    // TODO: Handler null response
    return await handleResponse(req, ctx, state);
  }

  if (view) {
    const props = await response.json();

    return ctx.render({ app: state, component: route.getView(), props });
  }

  return response;
};

const handleResponse = async (
  req: Request,
  ctx: HandlerContext,
  state: AppStateType,
) => {
  const errorHandler = state.config.errors.notFound.handler;
  const response = await errorHandler(req, ctx);

  const errorView = state.config.errors.notFound.view;
  if (errorView) {
    return ctx.renderNotFound();
  }

  return response;
};
