import { Directory } from "../../deps.ts";
import { ViewHelper } from "./ViewHelper.ts";

export class ControllerHelper {
  public static getDirectories(): string[] {
    const dir = ControllerHelper.getDirectory();
    const directories: string[] = [dir];

    const directory = new Directory(`${dir}`);
    directory.directories(null, true).forEach((dir) => {
      directories.push(dir.getPath());
    });

    return directories;
  }

  public static getControllers(): string[] {
    const controllersDir = ControllerHelper.getDirectory();
    const controllers: string[] = [];

    const directory = new Directory(`${controllersDir}`);
    directory.files(/Controller\.ts$/i, true).forEach((file) => {
      controllers.push(file.getPath().replace(/\.ts$/i, ""));
    });

    return controllers;
  }

  public static create(
    dir: string,
    name: string,
    routeName: string,
    routePath: string,
    methods: string[],
    view: string | null,
  ): boolean {
    const directory = new Directory(`${dir}/${name}`);

    if (directory.exists()) {
      return false;
    }

    directory.ensure();

    let viewImport = "";

    if (view) {
      const viewDir = dir.replace(
        new RegExp(`^${ControllerHelper.getDirectory()}`),
        ViewHelper.getDirectory(),
      );
      viewImport = `
import { ${view}View, ${view}ViewPropsType } from "@${viewDir}/${view}/mod.ts";`;
    }

    let returnText = `return response.json({
      message: "Welcome",
    });`;

    if (view) {
      returnText =
        `return await response.render<${view}ViewPropsType>(${view}View, {
        message: "Welcome",
      });`;
    }

    // create component
    directory.touch(
      `${name}Controller.ts`,
      `import { Route } from "@hypervit/decorator";
import type { IRequest } from "@hypervit/http";
import { Response as HttpResponse } from "@hypervit/http";${viewImport}

export class ${name}Controller {
  @Route("${routeName}", "${routePath}", { methods: ${
        JSON.stringify(methods)
      } })
  public async index(
    _request: IRequest,
    response: HttpResponse,
  ): Promise<Response> {
    ${returnText}
  }
}
`,
    );

    // create types.ts
    directory.touch(
      `types.ts`,
      `export type ${name}ControllerPropsType = {
  message: string;
};
`,
    );

    // create mod.ts
    directory.touch(
      `mod.ts`,
      `export * from "./${name}Controller.ts";
export * from "./types.ts";
`,
    );

    return true;
  }

  public static getDirectory(): string {
    // TODO: get directory dynamically

    return "controllers";
  }
}
