import { File, get, Keys } from "./deps.ts";
import { LocalConfigType, ManifestType } from "./types.ts";

export const getManifest = (): Record<string, ManifestType> | null => {
  const config = get<LocalConfigType>(Keys.Config.App);
  const publicDir = config.directories.public;
  const file = new File(`${publicDir}/manifest.json`);

  if (!file.exists()) {
    return null;
  }

  return JSON.parse(file.read());
};
