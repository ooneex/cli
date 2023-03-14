import {
  AppFullDirectoryType,
  config,
  ConfigException,
  Directory,
  File,
} from "../../deps.ts";

export class ViewHelper {
  public static async getDirectories(): Promise<string[]> {
    const dir = await ViewHelper.getDirectory();
    const directories: string[] = [dir];

    const directory = new Directory(`${dir}`);
    directory.directories(null, true).map((dir) => {
      directories.push(dir.getPath());
    });

    return directories;
  }

  public static async getViews(): Promise<string[]> {
    const viewsDir = await ViewHelper.getDirectory();
    const views: string[] = [];

    const directory = new Directory(`${viewsDir}`);
    directory.files(/View\.tsx$/i, true).map((file) => {
      views.push(file.getPath().replace(/\.tsx$/i, ""));
    });

    return views;
  }

  public static create(name: string, content: string): boolean {
    const file = new File(`${Deno.cwd()}/${name}.tsx`);

    if (file.exists()) {
      return false;
    }

    file.ensure();
    file.write(content);

    return true;
  }

  public static getDirectory(): string {
    const directories = config.getDirectories() as AppFullDirectoryType;

    if (!directories) {
      throw new ConfigException("Directories not found");
    }

    const directory = directories.views;
    if (!directory) {
      throw new ConfigException(`Directory "views" not found`);
    }

    return directory;
  }
}
