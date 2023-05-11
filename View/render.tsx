import { asset } from "./asset.ts";
import { EnvHelper, get, getAssets, Keys, renderToString } from "./deps.ts";
import { renderViewType, ViewType } from "./types.ts";

export const renderView: renderViewType = <T = unknown>(
  View: ViewType<T>,
  data?: T,
): string => {
  const envHelper = get<EnvHelper>(Keys.Env.Helper);

  // @ts-ignore: trust me
  let html = renderToString(<View {...(data ?? {})} />);
  html = `<!DOCTYPE html><html lang=${envHelper.getLocale()}>${html}</html>`;

  // Render island scripts and styles
  let styles = "";
  let scripts = "";

  const resourcesCache: string[] = [];

  html = html.replace(
    /data-ooneex-island-name ?= ?['"]([a-z0-9]+)['"]/ig,
    (token: string, name: string) => {
      const resources = getAssets(name);
      resources.forEach((resource) => {
        if (resource.css) {
          resource.css.forEach((css) => {
            if (!resourcesCache.includes(css)) {
              styles += `<link rel="stylesheet" href="${asset(css)}">\n`;
              resourcesCache.push(css);
            }
          });
        }

        if (!resourcesCache.includes(resource.file)) {
          scripts += `<script type="module" crossorigin src="${
            asset(resource.file)
          }"></script>\n`;
          resourcesCache.push(resource.file);
        }
      });

      return "";
    },
  );

  console.log("🚀 ~ file: render.tsx:17 ~ styles:", styles);
  console.log("🚀 ~ file: render.tsx:19 ~ scripts:", scripts);

  return html;
};
