import { compileIslands } from "./compile.ts";
import { File, get, Helper, Keys } from "./deps.ts";
import { IslandException } from "./IslandException.ts";
import { IslandNotFoundException } from "./IslandNotFoundException.ts";
import { IslandConfigType, LocalConfigType, ManifestType } from "./types.ts";

export const getIsland = async (
  island: string,
): Promise<IslandConfigType> => {
  const name = Helper.trim(island, "/").replace(/\.tsx/i, "");
  const config = get<LocalConfigType>(Keys.Config.App);

  const file = new File(`${config.directories.islands}/${name}.tsx`);
  if (!file.exists()) {
    throw new IslandNotFoundException(`Cannot found island ${name}.tsx`);
  }

  const updatedAt = file.updatedAt()?.getTime() as number;

  const cacheFile = new File(
    `${config.directories.var}/cache/islands/${name}.json`,
  );

  if (cacheFile.exists()) {
    const cachedIsland = cacheFile.json<string | number>();

    if (cachedIsland.updatedAt === updatedAt) {
      return {
        id: cachedIsland.id as string,
        name: cachedIsland.name as string,
        updatedAt,
      };
    }
  }

  let content = file.read();

  const id = crypto.randomUUID();

  content = `import { render } from "solid-js/web";

  ${content}
const elements = document.querySelectorAll<HTMLDivElement>(
  'div[data-ooneex-island-id="${id}"]',
);
elements.forEach((element) => {
  const data = window.ooneex.store.islands.data;
  const useData = (key: string) => data[key] ?? null;
  element.innerHTML = "";
  render(() => <${file.getName()} useData={useData} />, element);
});
  `;

  const proxyFileName = `${config.directories.islands}/${name}.proxy.tsx`;
  const proxyFile = new File(proxyFileName);
  proxyFile.write(content);
  await compileIslands(proxyFile.getPath(), "development");
  proxyFile.rm();

  const publicDir = config.directories.public;
  const manifestFile = new File(`${publicDir}/manifest.json`);

  if (!manifestFile.exists()) {
    throw new IslandException(`Cannot found "${publicDir}/manifest.json"`);
  }

  const manifest = manifestFile.json<ManifestType>();

  const data = {
    id,
    name,
    updatedAt,
    assets: manifest[proxyFileName],
  };

  cacheFile.writeJson(data);

  return { id, name, updatedAt };
};
