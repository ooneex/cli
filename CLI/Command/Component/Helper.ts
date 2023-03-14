import {
  AppDirectoryType,
  config,
  ConfigException,
  Directory,
  File,
} from "../../deps.ts";

export class ComponentHelper {
  public static async getDirectories(): Promise<string[]> {
    const dir = await ComponentHelper.getDirectory();
    const directories: string[] = [dir];

    const directory = new Directory(`${dir}`);
    directory.directories(null, true).map((dir) => {
      directories.push(dir.getPath());
    });

    return directories;
  }

  public static async getComponents(): Promise<string[]> {
    const componentsDir = await ComponentHelper.getDirectory();
    const components: string[] = [];

    const directory = new Directory(`${componentsDir}`);
    directory.files(/\.tsx$/i, true).map((file) => {
      components.push(file.getPath().replace(/\.tsx$/i, ""));
    });

    return components;
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
    const directories = config.getDirectories() as AppDirectoryType;

    if (!directories) {
      throw new ConfigException("Directories not found");
    }

    const directory = directories.components;
    if (!directory) {
      throw new ConfigException(`Directory "components" not found`);
    }

    return directory;
  }
}
