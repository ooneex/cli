import { build } from "./deps.ts";
import { getOptions } from "./ViteOptions.ts";

export const buildIslands = async (): Promise<void> => {
  const viteOptions = await getOptions();

  viteOptions.mode = "production";
  viteOptions.build.sourcemap = false;
  viteOptions.build.minify = true;
  viteOptions.build.css.devSourcemap = false;
  viteOptions.build.watch = null;
  await build(viteOptions);
};
