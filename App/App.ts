import { get, Keys } from "./deps.ts";
import { AppType } from "./types.ts";

export class App {
  public static getConfig<T = unknown>(): T {
    return get<T>(Keys.Config.App);
  }

  public static getType(): AppType {
    return get<AppType>(Keys.App.Type);
  }

  public static getRootDir(): string {
    return get<string>(Keys.App.RootDir);
  }

  public static isApi(): boolean {
    return App.getType() === "api";
  }

  public static isView(): boolean {
    return App.getType() === "view";
  }
}
