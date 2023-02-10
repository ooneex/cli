import { MiddlewareHandler, MiddlewareHandlerContext } from "../deps.ts";
import { AppStateType } from "../types.ts";

export const ProxyMiddleware: MiddlewareHandler<AppStateType> = async (
  _req: Request,
  ctx: MiddlewareHandlerContext<AppStateType>,
) => {
  return await ctx.next();
};
