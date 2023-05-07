import { EnvHelper, get, Keys, renderToString } from "./deps.ts";
import { renderViewType, ViewType } from "./types.ts";

export const renderView: renderViewType = <T = unknown>(
  View: ViewType<T>,
  data?: T,
): string => {
  const envHelper = get<EnvHelper>(Keys.Env.Helper);

  // @ts-ignore: trust me
  let html = renderToString(<View {...(data ?? {})} />);
  html = `<!DOCTYPE html><html lang=${envHelper.getLocale()}>${html}</html>`;

  return html;
};
