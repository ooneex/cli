import { build } from "./deps.ts";
import { getOptions } from "./ViteOptions.ts";

export const compileIslands = async (): Promise<void> => {
  const viteOptions = await getOptions();
  await build(viteOptions);
};
