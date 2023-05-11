import { Directory, get, getAssetFromCache, Keys, solid } from "./deps.ts";
import { LocalConfigType, ViteOptionsType } from "./types.ts";

export const getOptions = () => {
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
    mode: "development",
    cacheDir: directories.var,
    build: {
      outDir: `${directories.public}`,
      assetsDir: "islands",
      sourcemap: false,
      minify: false,
      manifest: true,
      write: true,
      emptyOutDir: false,
      css: {
        devSourcemap: true,
      },
      rollupOptions: {
        input: inputs,
        output: {
          entryFileNames: (chunkInfo: Record<"name", string>) =>
            getAssetFromCache(`islands/${chunkInfo.name}.js`, "islands"),
          chunkFileNames: (chunkInfo: Record<"name", string>) =>
            getAssetFromCache(`islands/${chunkInfo.name}.js`, "islands"),
          assetFileNames: (assetInfo: Record<"name", string>) =>
            getAssetFromCache(`islands/${assetInfo.name}`, "islands"),
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
