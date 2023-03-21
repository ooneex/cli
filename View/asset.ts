import { AppFullDirectoryType, config, env, File, Helper } from "./deps.ts";
export const assetPublicDir = "assets";

export const asset = (name: string): string => {
  name = Helper.trim(name, "/ ");

  if (!/^@/.test(name)) {
    return `${assetPublicDir}/${name}`;
  }

  name = Helper.trim(name, "@");
  const file = new File(name);

  if (!file.exists()) {
    return "";
  }

  const directories = config.getDirectories() as AppFullDirectoryType;
  const staticDir = directories.static;

  const filename = getAssetFromCache(`@${name}`);
  const assetFile = new File(`${staticDir}/${filename}`);

  if (!assetFile.exists()) {
    file.cp(`${staticDir}/${filename}`);
  } else {
    if (!env.isProd()) {
      file.cp(`${staticDir}/${filename}`, { overwrite: true });
    }
  }

  return `${assetPublicDir}/${filename}`;
};

export const getAssetFromCache = (name: string, directory?: string): string => {
  const directories = config.getDirectories() as AppFullDirectoryType;
  const varDir = directories.var;
  const file = new File(name);

  const assetsCacheFile = new File(`${varDir}/cache/assets.json`);

  if (!assetsCacheFile.exists()) {
    assetsCacheFile.ensure();
    assetsCacheFile.write(JSON.stringify({}));
  }

  const assetsCacheManifest = JSON.parse(assetsCacheFile.read());

  const ext = file.getExt();
  if (!assetsCacheManifest[name]) {
    if (directory) {
      assetsCacheManifest[name] = `${
        Helper.trim(directory, "/")
      }/${Helper.randomString()}.${ext}`;
    } else {
      assetsCacheManifest[name] = `${Helper.randomString()}.${file.getExt()}`;
    }

    assetsCacheFile.write(JSON.stringify(assetsCacheManifest));
  }

  return assetsCacheManifest[name];
};
