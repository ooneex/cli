import { Directory } from "../../deps.ts";

export class ViewHelper {
  public static getDirectories(): string[] {
    const dir = ViewHelper.getDirectory();
    const directories: string[] = [dir];

    const directory = new Directory(`${dir}`);
    directory.directories(null, true).forEach((dir) => {
      directories.push(dir.getPath());
    });

    return directories;
  }

  public static getViews(): string[] {
    const viewsDir = ViewHelper.getDirectory();
    const views: string[] = [];

    const directory = new Directory(`${viewsDir}`);
    directory.files(/View\.tsx$/i, true).forEach((file) => {
      views.push(file.getPath().replace(/\.tsx$/i, ""));
    });

    return views;
  }

  public static create(dir: string, name: string): boolean {
    const directory = new Directory(`${dir}/${name}`);

    if (directory.exists()) {
      return false;
    }

    directory.ensure();

    // create component
    directory.touch(
      `${name}View.tsx`,
      `import { Body, Head, Page } from "@hypervit/view";
import { ${name}ViewPropsType } from "./types.ts";

export const ${name}View = ({ message }: ${name}ViewPropsType) => {
  return (
    <Page>
      <Head title="${name}" />
      <Body>
        <h1>${name}View</h1>
        <p>{message}</p>
      </Body>
    </Page>
  );
};
`,
    );

    // create types.ts
    directory.touch(
      `types.ts`,
      `export type ${name}ViewPropsType = {
  message: string;
};
`,
    );

    // create mod.ts
    directory.touch(
      `mod.ts`,
      `export * from "./${name}View.tsx";
export * from "./types.ts";
`,
    );

    return true;
  }

  public static getDirectory(): string {
    // TODO: get directory dynamically

    return "views";
  }
}
