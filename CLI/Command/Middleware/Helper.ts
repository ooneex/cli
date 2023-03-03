import {
  AppDirectoryType,
  config,
  ConfigException,
  Directory,
  File,
} from "../../deps.ts";

export class MiddlewareHelper {
  public static async getDirectories(): Promise<string[]> {
    const dir = await MiddlewareHelper.getDirectory();
    const directories: string[] = [dir];

    const directory = new Directory(`${dir}`);
    directory.directories(null, true).map((dir) => {
      directories.push(dir.getPath());
    });

    return directories;
  }

  public static async getMiddlewares(): Promise<string[]> {
    const middlewaresDir = await MiddlewareHelper.getDirectory();
    const middlewares: string[] = [];

    const directory = new Directory(`${middlewaresDir}`);
    directory.files(/Middleware\.ts$/i, true).map((file) => {
      middlewares.push(file.getPath().replace(/\.ts$/i, ""));
    });

    return middlewares;
  }

  public static create(name: string, content: string): boolean {
    const file = new File(`${Deno.cwd()}/${name}.ts`);

    if (file.exists()) {
      return false;
    }

    file.ensure();
    file.write(content);

    return true;
  }

  public static getDirectory(): string {
    const directories = config.getDirectories() as AppDirectoryType;

    if (!directories) {
      throw new ConfigException("Directories not found");
    }

    const directory = directories.middlewares;
    if (!directory) {
      throw new ConfigException(`Directory "middlewares" not found`);
    }

    return directory;
  }
}
