import { asset } from "./asset.ts";
import {
  EnvHelper,
  File,
  get,
  getAssets,
  Keys,
  LocalConfigType,
  renderToString,
} from "./deps.ts";
import { renderViewType, ViewType } from "./types.ts";

export const renderView: renderViewType = <T = unknown>(
  View: ViewType<T>,
  data?: T,
): string => {
  const envHelper = get<EnvHelper>(Keys.Env.Helper);
  const config = get<LocalConfigType>(Keys.Config.App);

  // @ts-ignore: trust me
  let html = renderToString(<View {...(data ?? {})} />);
  html = `<!DOCTYPE html>${html}`;

  // Render island scripts and styles
  let styles = "";
  let scripts = "";
  let islandData = {};

  const resourcesCache: string[] = [];

  html = html.replace(
    /data-ooneex-island ?= ?['"]([a-z0-9]+)__([a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+)['"]/ig,
    (token: string, name: string, id: string) => {
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

      const cacheFile = new File(
        `${config.directories.var}/cache/islands/${name}/${id}.json`,
      );

      if (cacheFile.exists()) {
        islandData = { ...islandData, ...(cacheFile.json()) };
        cacheFile.getDirectory().rm();
      }

      return "";
    },
  );

  // Set global data
  const store: Record<string, unknown> = {
    store: {
      islands: { data: islandData },
    },
  };

  html = html.replace(
    `<meta name="description" content="ooneex-island-styles-fb26a3d7-6e80-4cda-a797-3c0163a517fc"/>`,
    styles,
  );
  html = html.replace(
    `<span style="display:none;" class="ooneex-island-scripts-e10a91b1-a672-4ff1-9d72-1150f3becaa0"></span>`,
    `<script>
      window.ooneex = ${JSON.stringify(store)};
    </script>\n
    ${scripts}
    `,
  );

  return html;
};
