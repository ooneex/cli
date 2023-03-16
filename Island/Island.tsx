import { ComponentChildren } from "https://esm.sh/preact@10.12.1";
import { AppFullDirectoryType, config, File, Helper } from "./deps.ts";

interface IIslandProps {
  name: string;
  key?: string;
  data?: Record<string, unknown>;
  children?: ComponentChildren;
}

type ManifestType = {
  assets?: string[];
  css?: string[];
  file: string;
  imports?: string[];
  isEntry?: boolean;
  src?: string;
};

export const Island = (props: IIslandProps) => {
  const name = Helper.trim(props.name, "/");
  const id = getId(name);

  if (!id) {
    return null;
  }

  const storageId = crypto.randomUUID();

  if (props.key && props.data) {
    localStorage.setItem(storageId, JSON.stringify({
      key: props.key,
      data: props.data,
    }));
  }

  return (
    <div id={id} data-ooneex-island-64d2e8dc={`${name}--${storageId}`}>
      {props.children}
    </div>
  );
};

export const getManifest = (): Record<string, ManifestType> | null => {
  const directories = config.getDirectories() as AppFullDirectoryType;
  const staticDir = directories.static;
  const file = new File(`${staticDir}/manifest.json`);

  if (!file.exists()) {
    return null;
  }

  return JSON.parse(file.read());
};

export const getId = (name: string): string | null => {
  const island = getIsland(name);

  if (!island) {
    return null;
  }

  const directories = config.getDirectories() as AppFullDirectoryType;
  const staticDir = directories.static;
  const islandFile = `${staticDir}/${island.file}`;
  const file = new File(islandFile);
  if (!file) {
    return null;
  }

  const match = file.read().match(
    /document\.getElementById\(["']([a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+)["']/i,
  );

  if (!match) {
    return null;
  }

  return match[1];
};

export const getIsland = (
  name: string,
  isImport = false,
): ManifestType | null => {
  const manifest = getManifest();
  if (!manifest) {
    return null;
  }
  const directories = config.getDirectories() as AppFullDirectoryType;
  const islandsDir = directories.islands;

  const islandPath = isImport ? `${name}.js` : `${islandsDir}/${name}.tsx`;
  const island = manifest[islandPath];
  if (!island) {
    return null;
  }

  return island;
};

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
