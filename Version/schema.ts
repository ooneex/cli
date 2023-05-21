import { z } from "./deps.ts";
import { parseVersion } from "./parse.ts";

export const VersionSchema = z.custom<string>(
  (value: unknown): boolean => {
    const v = parseVersion(value as string);

    return v !== null;
  },
);
