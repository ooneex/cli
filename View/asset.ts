import { File, get, Helper, Keys } from "./deps.ts";
export const publicDir = "public";

type LocalConfigType = { directories: { var: string } };

export const asset = (name: string): string => {
  const config = get<{ directories: { public: string } }>(Keys.Config.App);
  name = Helper.trim(name, "/ ");

  return `${config.directories.public}/${name}`;
};

export const getAssetFromCache = (name: string, directory?: string): string => {
  const config = get<LocalConfigType>(Keys.Config.App);
  const directories = config.directories;
  const varDir = directories.var;
  const file = new File(name);

  const assetsCacheFile = new File(`${varDir}/cache/assets.json`);

  if (!assetsCacheFile.exists()) {
    assetsCacheFile.ensure();
    assetsCacheFile.write(JSON.stringify({}));
  }

  const assetsCacheManifest = JSON.parse(assetsCacheFile.read());

  let hash = "a";
  for (let i = 0; i < 10; i++) {
    hash += String(Helper.randomInt(9));
  }

  const ext = file.getExt();
  if (!assetsCacheManifest[name]) {
    if (directory) {
      assetsCacheManifest[name] = `${
        Helper.trim(directory, "/")
      }/${hash}.${ext}`;
    } else {
      assetsCacheManifest[name] = `${hash}.${file.getExt()}`;
    }

    assetsCacheFile.write(JSON.stringify(assetsCacheManifest));
  }

  return assetsCacheManifest[name];
};
