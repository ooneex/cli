import { AppType, loadAppConfig } from "./deps.ts";

export class App {
  public static getConfig<T = unknown>(): T {
    return loadAppConfig<T>();
  }

  public static getType(): AppType {
    return App.getConfig<{ type: AppType }>().type;
  }

  public static getRootDir(): string {
    return App.getConfig<{ directories: { root: string } }>().directories.root;
  }

  public static isApi(): boolean {
    return App.getType() === "api";
  }

  public static isView(): boolean {
    return App.getType() === "view";
  }
}
