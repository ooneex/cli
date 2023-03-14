import {
  AppFullDirectoryType,
  config,
  ConfigException,
  Directory,
  File,
} from "../../deps.ts";

export class IslandHelper {
  public static async getDirectories(): Promise<string[]> {
    const dir = await IslandHelper.getDirectory();
    const directories: string[] = [dir];

    const directory = new Directory(`${dir}`);
    directory.directories(null, true).map((dir) => {
      directories.push(dir.getPath());
    });

    return directories;
  }

  public static async getIslands(): Promise<string[]> {
    const islandsDir = await IslandHelper.getDirectory();
    const islands: string[] = [];

    const directory = new Directory(`${islandsDir}`);
    directory.files(/\.tsx$/i, true).map((file) => {
      islands.push(file.getPath().replace(/\.tsx$/i, ""));
    });

    return islands;
  }

  public static create(name: string, content: string): boolean {
    const file = new File(`${Deno.cwd()}/${name}.tsx`);

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

    const directory = directories.islands;
    if (!directory) {
      throw new ConfigException(`Directory "islands" not found`);
    }

    return directory;
  }
}
