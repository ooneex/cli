import solid from "npm:vite-plugin-solid@^2.4.0";
import { AppFullDirectoryType, config, Directory } from "./deps.ts";

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
      outDir: `${directories.static}/dist`,
      assetsDir: ".",
      sourcemap: false,
      minify: false,
      manifest: true,
      write: true,
      emptyOutDir: true,
      css: {
        devSourcemap: true,
      },
      rollupOptions: {
        input: inputs,
        output: {
          entryFileNames: `[hash:15].js`,
          assetFileNames: (assetInfo: Record<"name", string>) => {
            return `${
              assetInfo.name.replace(/.+\.([a-z0-9]+)/, (_match, ext) =>
                `[hash:15].${ext}`)
            }`;
          },
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
