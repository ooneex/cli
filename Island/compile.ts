import { getOptions } from "./ViteOptions.ts";
import { build } from "./deps.ts";
import { ViteOptionsModeType } from "./types.ts";

export const compileIslands = async (
  island: string,
  appEnv: ViteOptionsModeType,
): Promise<void> => {
  const viteOptions = getOptions(island, appEnv);
  await build(viteOptions);
};
