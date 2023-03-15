import { build } from "npm:vite@^4.0.0";
import { getOptions } from "./ViteOptions.ts";

export const watchIslands = async (): Promise<void> => {
  const viteOptions = await getOptions();
  viteOptions.build.watch = {};
  await build(viteOptions);
};
