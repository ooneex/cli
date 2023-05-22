export class App {
  public static getType(): string {
    return Deno.env.get("OONEEX_APP_TYPE") as string;
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
