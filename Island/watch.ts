import { getOptions } from "./ViteOptions.ts";
import { build } from "./deps.ts";

export const watchIslands = async (): Promise<void> => {
  const viteOptions = getOptions();
  viteOptions.build.watch = {};
  await build(viteOptions);
};
