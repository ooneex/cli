import { build } from "./deps.ts";
import { getOptions } from "./ViteOptions.ts";

export const watchIslands = async (): Promise<void> => {
  const viteOptions = await getOptions();
  viteOptions.build.watch = {};
  await build(viteOptions);
};
