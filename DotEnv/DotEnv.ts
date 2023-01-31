import { Collection, File, Helper } from "./deps.ts";
import { DotEnvException } from "./DotEnvException.ts";
import { DotEnvValueType, IDotEnv } from "./types.ts";

/**
 * This class is used to manage environment variables.
 *
 * @example
 *
 *  ```ts
 *  const dotEnv = new DotEnv();
 *  await dotEnv.parse(".env");
 *  await dotEnv.parse(".env.test");
 *  await dotEnv.parse(".env.local");
 *  const appEnv = dotEnv.get<string>("APP_ENV");
 *  ```
 */
export class DotEnv extends Collection<string, DotEnvValueType>
  implements IDotEnv {
  public async parse(path: string): Promise<void> {
    try {
      const file = new File(path);
      if (!file.exists()) {
        return;
      }
      const contents = await file.lines();

      contents.map((c) => {
        c = c.trim();

        if (/^#/i.test(c)) {
          return;
        }

        if (/[a-z_]+ ?=/i.test(c)) {
          const matches = c.match(/([a-z_]+) ?=(.+)/i);
          if (matches) {
            const key = matches[1];
            const value: DotEnvValueType = Helper.trim(matches[2], `'|"`);

            this.add(key, Helper.parseString(value) as DotEnvValueType);
          }
        }
      });
    } catch (e) {
      throw new DotEnvException(`[parse] ${e.message}`);
    }
  }

  public fromJson(data: Record<string, DotEnvValueType>): DotEnv {
    this.setData(data);

    return this;
  }
}
