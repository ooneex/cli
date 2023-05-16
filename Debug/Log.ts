import { LogType } from "./types.ts";

// deno-lint-ignore no-explicit-any
export const Log: LogType = (...data: any[]): void => {
  console.debug(...data);
  console.trace();
};
