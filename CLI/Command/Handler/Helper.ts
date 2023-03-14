import {
  AppFullDirectoryType,
  config,
  ConfigException,
  Directory,
  File,
} from "../../deps.ts";

export class HandlerHelper {
  public static async getDirectories(): Promise<string[]> {
    const dir = await HandlerHelper.getDirectory();
    const directories: string[] = [dir];

    const directory = new Directory(`${dir}`);
    directory.directories(null, true).map((dir) => {
      directories.push(dir.getPath());
    });

    return directories;
  }

  public static async getHandlers(): Promise<string[]> {
    const handlersDir = await HandlerHelper.getDirectory();
    const handlers: string[] = [];

    const directory = new Directory(`${handlersDir}`);
    directory.files(/Handler\.ts$/i, true).map((file) => {
      handlers.push(file.getPath().replace(/\.ts$/i, ""));
    });

    return handlers;
  }

  public static create(name: string, content: string): boolean {
    const file = new File(`${Deno.cwd()}/${name}.ts`);

    if (file.exists()) {
      return false;
    }

    file.ensure();
    file.write(content);

    return false;
  }

  public static getDirectory(): string {
    const directories = config.getDirectories() as AppFullDirectoryType;

    if (!directories) {
      throw new ConfigException("Directories not found");
    }

    const directory = directories.handlers;
    if (!directory) {
      throw new ConfigException(`Directory "handlers" not found`);
    }

    return directory;
  }
}
