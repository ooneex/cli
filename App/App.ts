import { get, Keys } from "./deps.ts";
import { AppType } from "./types.ts";

export class App {
  public static getType(): AppType {
    const config = get<{ type: AppType }>(Keys.Config.App);

    return config.type;
  }

  public static getRootDir(): string {
    return Deno.env.get("OONEEX_APP_ROOT_DIR") as string;
  }

  public static isApi(): boolean {
    return App.getType() === "api";
  }

  public static isView(): boolean {
    return App.getType() === "view";
  }
}
