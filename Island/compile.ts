import { build } from "npm:vite@^4.0.0";
import { getOptions } from "./ViteOptions.ts";

export const compileIslands = async (): Promise<void> => {
  const viteOptions = await getOptions();
  await build(viteOptions);
};
