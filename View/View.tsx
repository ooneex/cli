import { render as renderToString } from "npm:preact-render-to-string";
import { asset } from "./asset.ts";
import { env, File, getAssets, Helper, Path } from "./deps.ts";
import { IView, ViewType } from "./types.ts";
import { ViewNotFoundException } from "./ViewNotFoundException.ts";

export class View implements IView {
  public async render(
    view: ViewType,
    data: Record<string, unknown> = {},
  ): Promise<string> {
    view = Path.normalize(Helper.trim(view, "/")) as ViewType;

    const viewPath = `${Deno.cwd()}/${view}.tsx`;

    const file = new File(viewPath);
    if (!file.exists()) {
      throw new ViewNotFoundException(`View "${view}" not found`);
    }

    const Component = (await import(viewPath)).default;
    let content = renderToString(<Component {...data} />);
    content = `<!DOCTYPE html><html lang=${env.getLocale()}>${content}</html>`;

    let styles = "";
    let scripts = "";
    let islandData: string | null = null;
    const resourcesCache: string[] = [];

    content = content.replace(
      /data-ooneex-island-64d2e8dc ?= ?['"]([a-z0-9-]+)--([a-z0-9-]+)['"]/ig,
      (token: string, name: string, id: string) => {
        const resources = getAssets(name);

        resources.map((resource) => {
          if (resource.css) {
            resource.css.map((css) => {
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

        // TODO: inject data to island
        islandData = localStorage.getItem(id);
        localStorage.removeItem(id);

        return "";
      },
    );

    content = content.replace(
      "#-ooneex-island-mark-64d2e8dc-#",
      `${scripts}\n${styles}`,
    );

    return content;
  }
}

export const view = new View();
