export class App {
  public static isApi(): boolean {
    return Deno.env.get("OONEEX_APP_TYPE") === "api";
  }

  public static isView(): boolean {
    return Deno.env.get("OONEEX_APP_TYPE") === "view";
  }
}
