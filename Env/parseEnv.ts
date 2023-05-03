import { Helper } from "./deps.ts";
import { DotEnvType, DotEnvValueType } from "./types.ts";

/**
 * This class is used to manage environment variables.
 */
export const parseEnv = (content: string): DotEnvType => {
  const result: Record<string, DotEnvValueType> = {};
  const lines: string[] = content.split(/\n/);

  lines.forEach((c) => {
    c = c.trim();

    if (/^#/i.test(c)) {
      return;
    }

    if (/[a-z_]+ ?=/i.test(c)) {
      const matches = c.match(/([a-z_]+) ?=(.+)/i);
      if (matches) {
        const key = matches[1];
        const value: DotEnvValueType = Helper.trim(matches[2], `'|"`);

        result[key] = Helper.parseString(value) as DotEnvValueType;
      }
    }
  });

  return result;
};
