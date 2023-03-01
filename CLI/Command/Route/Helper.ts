import { Directory, File, RouteException } from "../../deps.ts";

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

  public static createRoute(name: string, content: string): boolean {
    const file = new File(`${Deno.cwd()}/${name}.ts`);

    if (file.exists()) {
      return false;
    }

    file.ensure();
    file.write(content);

    return false;
  }

  public static async getDirectory(): Promise<string> {
    try {
      return (await import(`${Deno.cwd()}/config/app.config.ts`)).default
        .directories.routes;
    } catch (e) {
      throw new RouteException(e.message);
    }
  }
}
