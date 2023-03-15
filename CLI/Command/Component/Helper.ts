import {
  AppFullDirectoryType,
  config,
  ConfigException,
  Directory,
  File,
} from "../../deps.ts";

const __dirname = new URL(".", import.meta.url).pathname;

export class ComponentHelper {
  public static getDirectories(): string[] {
    const dir = ComponentHelper.getDirectory();
    const directories: string[] = [dir];

    const directory = new Directory(`${dir}`);
    directory.directories(null, true).map((dir) => {
      directories.push(dir.getPath());
    });

    return directories;
  }

  public static getComponents(): string[] {
    const componentsDir = ComponentHelper.getDirectory();
    const components: string[] = [];

    const directory = new Directory(`${componentsDir}`);
    directory.files(/\.tsx$/i, true).map((file) => {
      components.push(file.getPath().replace(/\.tsx$/i, ""));
    });

    return components;
  }

  public static create(dir: string, name: string, content: string): boolean {
    const directory = new Directory(`${dir}/${name}`);

    if (directory.exists()) {
      return false;
    }

    directory.ensure();

    directory.touch(`${name}.tsx`, content);

    content = (new File(`${__dirname}types.template.txt`)).read()
      .replaceAll("{{ name }}", name);
    directory.touch(`types.ts`, content);

    content = (new File(`${__dirname}mod.template.txt`)).read()
      .replaceAll("{{ name }}", name);
    directory.touch(`mod.ts`, content);

    return false;
  }

  public static getDirectory(): string {
    const directories = config.getDirectories() as AppFullDirectoryType;

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
