import { build } from "npm:vite@^4.0.0";
import { ViteOptions } from "./ViteOptions.ts";

export const compileIslands = async (): Promise<void> => {
  await build(ViteOptions);
};
