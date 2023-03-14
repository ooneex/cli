import { build } from "npm:vite@^4.0.0";
import solid from "npm:vite-plugin-solid@^2.4.0";
import { AppFullDirectoryType, config, Directory } from "./deps.ts";

export const watchIslands = async (): Promise<void> => {
  await config.parse();

  const directories = config.getDirectories() as AppFullDirectoryType;
  const directory = new Directory(directories.islands);
  const islands = directory.files(/\.tsx$/);
  const inputs: string[] = [];

  islands.map((island) => {
    inputs.push(island.getPath());
  });

  await build(
    {
      appType: "custom",
      clearScreen: true,
      logLevel: "info",
      build: {
        outDir: directories.static,
        assetsDir: "dist",
        sourcemap: false,
        minify: false,
        manifest: true,
        write: true,
        rollupOptions: {
          input: inputs,
          output: {
            entryFileNames: `dist/[hash:15].js`,
          },
        },
        watch: {
          clearScreen: true,
        },
      },
      plugins: [solid({
        solid: {
          hydratable: true,
        },
      })],
    },
  );
};
