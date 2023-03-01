import { Directory, File, ViewException } from "../../deps.ts";

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

  public static createView(name: string, content: string): boolean {
    const file = new File(`${Deno.cwd()}/${name}.tsx`);

    if (file.exists()) {
      return false;
    }

    file.ensure();
    file.write(content);

    return true;
  }

  public static async getDirectory(): Promise<string> {
    try {
      return (await import(`${Deno.cwd()}/config/app.config.ts`)).default
        .directories.views;
    } catch (e) {
      throw new ViewException(e.message);
    }
  }
}
