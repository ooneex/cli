import { ViewNotFoundException } from "./ViewNotFoundException.ts";
import { File, get, Helper, Keys } from "./deps.ts";

type LocalConfigType = { directories: { var: string; public: string } };

export const asset = (name: string): string => {
  const config = get<LocalConfigType>(Keys.Config.App);
  name = Helper.trim(name, "/ ");

  if (!/^@/.test(name)) {
    const path = `${config.directories.public}/${name}`;
    const file = new File(path);
    if (!file.exists()) {
      throw new ViewNotFoundException(`Cannot found asset "${file.getPath()}"`);
    }

    return `/${path}`;
  }

  name = Helper.trim(name, "@");
  const file = new File(name);

  if (!file.exists()) {
    return "";
  }

  const publicDir = config.directories.public;
  const updatedAt = file.updatedAt()?.getTime() as number;

  const filename = getAssetFromCache(`${name}`, `${publicDir}/assets`);
  const assetFile = new File(filename.name);

  if (!assetFile.exists()) {
    file.cp(`${assetFile.getPath()}`);
  } else {
    if (filename.date !== updatedAt) {
      file.cp(`${assetFile.getPath()}`, { overwrite: true });
    }
  }

  return `/${assetFile.getPath()}`;
};

export const getAssetFromCache = (
  name: string,
  directory?: string,
): { name: string; date: number } => {
  const config = get<LocalConfigType>(Keys.Config.App);
  const directories = config.directories;
  const varDir = directories.var;
  const file = new File(name);
  const realName = name.replace(/\.__proxy__\.js$/i, ".tsx");
  const assetsCacheFile = new File(`${varDir}/cache/assets.json`);

  if (!assetsCacheFile.exists()) {
    assetsCacheFile.writeJson({});
  }

  const assetsCacheManifest = assetsCacheFile.json<
    { name: string; date: number }
  >();

  if (assetsCacheManifest[realName]) {
    return assetsCacheManifest[realName];
  }

  let hash = "a";
  for (let i = 0; i < 15; i++) {
    hash += `${Helper.randomInt(9)}`;
  }

  const ext = file.getExt();
  const realFile = new File(realName);
  if (directory) {
    assetsCacheManifest[realName] = {
      name: `${Helper.trim(directory, "/")}/${hash}.${ext}`,
      date: realFile.updatedAt()?.getTime() as number,
    };
  } else {
    assetsCacheManifest[realName] = {
      name: `${hash}.${ext}`,
      date: realFile.updatedAt()?.getTime() as number,
    };
  }

  assetsCacheFile.writeJson(assetsCacheManifest);

  return assetsCacheManifest[realName];
};
