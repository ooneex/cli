import { parse, SemVer } from "./deps.ts";
import { OptionsType } from "./types.ts";

export const parseVersion = (
  version: string | SemVer,
  options?: OptionsType,
): SemVer | null => {
  return parse(version, options);
};
