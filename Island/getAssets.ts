import { getIsland } from "./getIsland.ts";
import { ManifestType } from "./types.ts";

export const getAssets = (name: string): ManifestType[] => {
  const result: ManifestType[] = [];
  const island = getIsland(name);

  if (island?.imports) {
    island?.imports.map((i) => {
      const resource = getIsland(i.replace(".js", ""), true);
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
