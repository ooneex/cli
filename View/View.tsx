import { env, File, getAssets, Helper, Path, renderToString } from "./deps.ts";
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
    const assetsCache: string[] = [];

    content = content.replace(
      /data\-ooneex\-island\-64d2e8dc ?= ?['"]([a-z0-9-]+)--([a-z0-9-]+)['"]/ig,
      (token, name, id) => {
        const assets = getAssets(name);

        assets.map((asset) => {
          if (asset.css) {
            asset.css.map((css) => {
              if (!assetsCache.includes(css)) {
                styles += `<link rel="stylesheet" href="${css}">\n`;
                assetsCache.push(css);
              }
            });
          }

          if (!assetsCache.includes(asset.file)) {
            scripts +=
              `<script type="module" crossorigin src="${asset.file}"></script>\n`;
            assetsCache.push(asset.file);
          }
        });

        return "";
      },
    );

    content = content.replace(
      "---ooneex-island-mark-64d2e8dc---",
      `${scripts}\n${styles}`,
    );

    return content;
  }
}

export const view = new View();
