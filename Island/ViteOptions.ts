import { Directory, get, getAssetFromCache, Keys, solid } from "./deps.ts";
import {
  LocalConfigType,
  ViteOptionsModeType,
  ViteOptionsType,
} from "./types.ts";

export const getOptions = (
  island: string,
  mode: ViteOptionsModeType,
) => {
  const config = get<LocalConfigType>(Keys.Config.App);
  const directories = config.directories;
  const directory = new Directory(directories.islands);
  const islands = directory.files(/\.tsx$/);
  const inputs: string[] = [];

  islands.forEach((island) => {
    inputs.push(island.getPath());
  });

  const ViteOptions: ViteOptionsType = {
    appType: "custom",
    logLevel: "info",
    mode,
    cacheDir: directories.var,
    build: {
      outDir: `${directories.public}`,
      assetsDir: `${directories.islands}`,
      sourcemap: mode === "development",
      minify: mode === "production",
      manifest: true,
      write: true,
      emptyOutDir: false,
      css: {
        devSourcemap: mode === "development",
      },
      rollupOptions: {
        input: island,
        output: {
          entryFileNames: (chunkInfo: Record<"name", string>) =>
            getAssetFromCache(
              `${directories.islands}/${chunkInfo.name}.js`,
              directories.islands,
            ).name,
          chunkFileNames: (chunkInfo: Record<"name", string>) =>
            getAssetFromCache(
              `${directories.islands}/${chunkInfo.name}.js`,
              directories.islands,
            ).name,
          assetFileNames: (assetInfo: Record<"name", string>) =>
            getAssetFromCache(
              `${directories.islands}/${assetInfo.name}`,
              directories.islands,
            ).name,
        },
      },
      watch: null,
    },
    plugins: [solid({
      solid: {
        hydratable: true,
      },
    })],
  };

  return ViteOptions;
};
