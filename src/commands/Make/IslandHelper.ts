import { Directory } from "../../deps.ts";

export class IslandHelper {
  public static getDirectories(): string[] {
    const dir = IslandHelper.getDirectory();
    const directories: string[] = [dir];

    const directory = new Directory(`${dir}`);
    directory.directories(null, true).forEach((dir) => {
      directories.push(dir.getPath());
    });

    return directories;
  }

  public static getIslands(): string[] {
    const componentsDir = IslandHelper.getDirectory();
    const components: string[] = [];

    const directory = new Directory(`${componentsDir}`);
    directory.files(/\.tsx$/i, true).map((file) => {
      components.push(file.getPath().replace(/\.tsx$/i, ""));
    });

    return components;
  }

  public static create(dir: string, name: string): boolean {
    const directory = new Directory(`${dir}/${name}`);

    if (directory.exists()) {
      return false;
    }

    directory.ensure();

    // create component
    directory.touch(
      `${name}.tsx`,
      `import { render } from "../render.tsx";
import { ${name}PropsType } from "./types.ts";

export const ${name} = ({ message }: ${name}PropsType) => {
  return (
    <>
      <p>{message}</p>
    </>
  );
};

// Don't change it
render(${name}, "__${crypto.randomUUID()}__");
`,
    );

    // create types.ts
    directory.touch(
      `types.ts`,
      `export type ${name}PropsType = {
  message: string;
};
`,
    );

    // create mod.ts
    directory.touch(
      `mod.ts`,
      `export * from "./${name}.tsx";
export * from "./types.ts";
`,
    );

    return true;
  }

  public static getDirectory(): string {
    // TODO: get directory dynamically

    return "islands";
  }
}
