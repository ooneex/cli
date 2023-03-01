import { Directory, File, HandlerException } from "../../deps.ts";

export class HandlerHelper {
  public static async getDirectories(): Promise<string[]> {
    const dir = await HandlerHelper.getDirectory();
    const directories: string[] = [dir];

    const directory = new Directory(`${dir}`);
    directory.directories(null, true).map((dir) => {
      directories.push(dir.getPath());
    });

    return directories;
  }

  public static async getHandlers(): Promise<string[]> {
    const handlersDir = await HandlerHelper.getDirectory();
    const handlers: string[] = [];

    const directory = new Directory(`${handlersDir}`);
    directory.files(/Handler\.ts$/i, true).map((file) => {
      handlers.push(file.getPath().replace(/\.ts$/i, ""));
    });

    return handlers;
  }

  public static createHandler(name: string, content: string): boolean {
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
        .directories.handlers;
    } catch (e) {
      throw new HandlerException(e.message);
    }
  }
}
