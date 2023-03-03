import {
  AppDirectoryType,
  config,
  ConfigException,
  Directory,
  File,
} from "../../deps.ts";

export class RouteHelper {
  public static async getDirectories(): Promise<string[]> {
    const dir = await RouteHelper.getDirectory();
    const directories: string[] = [dir];

    const directory = new Directory(`${dir}`);
    directory.directories(null, true).map((dir) => {
      directories.push(dir.getPath());
    });

    return directories;
  }

  public static async getRoutes(): Promise<string[]> {
    const routesDir = await RouteHelper.getDirectory();
    const routes: string[] = [];

    const directory = new Directory(`${routesDir}`);
    directory.files(/Route\.ts$/i, true).map((file) => {
      routes.push(file.getPath().replace(/\.ts$/i, ""));
    });

    return routes;
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
    const directories = config.getDirectories() as AppDirectoryType;

    if (!directories) {
      throw new ConfigException("Directories not found");
    }

    const directory = directories.routes;
    if (!directory) {
      throw new ConfigException(`Directory "routes" not found`);
    }

    return directory;
  }
}
