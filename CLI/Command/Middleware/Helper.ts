import {Directory, File, MiddlewareException} from "../../deps.ts";

export class MiddlewareHelper {
  public static async getMiddlewares(): Promise<string[]> {
    const middlewaresDir = await MiddlewareHelper.getMiddlewaresDirectory();
    const middlewares: string[] = [];

    const directory = new Directory(`${middlewaresDir}`);
    directory.files(/Middleware\.ts$/i, true).map((file) => {
      middlewares.push(file.getPath().replace(/\.ts$/i, ""));
    });

    return middlewares;
  }

  public static createMiddleware(name: string, content: string): boolean {
    const file = new File(`${Deno.cwd()}/${name}.ts`);

    if (file.exists()) {
      return false;
    }

    file.ensure();
    file.write(content);

    return true;
  }

  public static async getMiddlewaresDirectory(): Promise<string> {
    try {
      return (await import(`${Deno.cwd()}/config/app.config.ts`)).default.directories.middlewares;
    } catch (e) {
      throw new MiddlewareException(e.message);
    }
  }
}
