import { build } from "npm:vite@^4.0.0";
import { ViteOptions } from "./ViteOptions.ts";

export const buildIslands = async (): Promise<void> => {
  ViteOptions.mode = "production";
  ViteOptions.build.sourcemap = false;
  ViteOptions.build.minify = true;
  ViteOptions.build.css.devSourcemap = false;
  ViteOptions.build.watch = null;
  await build(ViteOptions);
};
