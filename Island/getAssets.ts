import { File, get, Keys } from "./deps.ts";
import { LocalConfigType, ManifestType } from "./types.ts";

const getIsland = (
  name: string,
): ManifestType | null => {
  const config = get<LocalConfigType>(Keys.Config.App);

  const file = new File(
    `${config.directories.var}/cache/islands/${name}.json`,
  );

  if (!file.exists()) {
    return null;
  }

  const islandConfig = file.json<ManifestType>();

  return islandConfig["assets"];
};

export const getAssets = (name: string): ManifestType[] => {
  const result: ManifestType[] = [];
  const island = getIsland(name);

  if (island?.imports) {
    island?.imports.map((i) => {
      const resource = getIsland(i.replace(".js", ""));
      if (resource) {
        result.push(resource);
      }
    });
  }

  if (island) {
    result.push(island);
  }

  return result;
};
