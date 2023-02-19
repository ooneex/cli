import { Directory } from "../deps.ts";
import { AppDirectoryType } from "./types.ts";

export class AppDirectory {
  constructor(public readonly data: AppDirectoryType = AppDefaultDirectories) {
  }

  public ensure(): this {
    Object.values(this.data).map((d: string) => {
      const directory = new Directory(`${Deno.cwd()}/${d}`);
      directory.ensure();
    });

    return this;
  }
}

export const AppDefaultDirectories: AppDirectoryType = {
  bin: "bin",
  components: "components",
  config: "config",
  fixtures: "fixtures",
  handlers: "handlers",
  islands: "islands",
  middlewares: "middlewares",
  migrations: "migrations",
  routes: "routes",
  static: "static",
  var: "var",
  views: "views",
};
