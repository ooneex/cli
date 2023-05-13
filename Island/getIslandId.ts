import { File, get, Keys } from "./deps.ts";
import { getIsland } from "./getIsland.ts";
import { LocalConfigType } from "./types.ts";

export const getIslandId = (name: string): string | null => {
  const island = getIsland(name);

  if (!island) {
    return null;
  }

  const config = get<LocalConfigType>(Keys.Config.App);
  const publicDir = config.directories.public;

  const islandFile = `${publicDir}/${island.file}`;
  const file = new File(islandFile);
  if (!file) {
    return null;
  }

  const match = file.read().match(
    /div\[data\-ooneex\-island\-id="([a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+)"\]/i,
  );

  if (!match) {
    return null;
  }

  return match[1];
};
