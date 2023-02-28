import {Directory, File, HandlerException} from "../../deps.ts";

export class HandlerHelper {
  public static async getHandlers(): Promise<string[]> {
    const handlersDir = await HandlerHelper.getHandlersDirectory();
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

  public static async getHandlersDirectory(): Promise<string> {
    try {
      return (await import(`${Deno.cwd()}/config/app.config.ts`)).default.directories.handlers;
    } catch (e) {
      throw new HandlerException(e.message);
    }
  }
}
