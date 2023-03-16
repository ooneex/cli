import solid from "npm:vite-plugin-solid@^2.4.0";
import {
  AppFullDirectoryType,
  config,
  Directory,
  getAssetFromCache,
} from "./deps.ts";

export const getOptions = async () => {
  await config.parse();
  const directories = config.getDirectories() as AppFullDirectoryType;
  const directory = new Directory(directories.islands);
  const islands = directory.files(/\.tsx$/);
  const inputs: string[] = [];

  islands.map((island) => {
    inputs.push(island.getPath());
  });

  const ViteOptions: Record<string, unknown> & {
    mode: "development" | "production";
    build: Record<string, unknown> & {
      sourcemap: boolean;
      minify: boolean;
      css: {
        devSourcemap: boolean;
      };
      watch: null | Record<string, unknown>;
    };
  } = {
    appType: "custom",
    logLevel: "info",
    mode: "development",
    cacheDir: directories.var,
    build: {
      outDir: `${directories.static}`,
      assetsDir: "dist",
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
            getAssetFromCache(`dist/${chunkInfo.name}.js`, "dist"),
          chunkFileNames: (chunkInfo: Record<"name", string>) =>
            getAssetFromCache(`dist/${chunkInfo.name}.js`, "dist"),
          assetFileNames: (assetInfo: Record<"name", string>) =>
            getAssetFromCache(`dist/${assetInfo.name}`, "dist"),
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
