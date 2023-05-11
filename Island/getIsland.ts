import { get, Keys } from "./deps.ts";
import { getManifest } from "./getManifest.ts";
import { LocalConfigType, ManifestType } from "./types.ts";

export const getIsland = (
  name: string,
  isImport = false,
): ManifestType | null => {
  const manifest = getManifest();
  if (!manifest) {
    return null;
  }

  const config = get<LocalConfigType>(Keys.Config.App);
  const islandsDir = config.directories.islands;
  const islandPath = isImport ? `${name}.js` : `${islandsDir}/${name}.tsx`;
  const island = manifest[islandPath];
  if (!island) {
    return null;
  }

  return island;
};
