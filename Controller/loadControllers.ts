import { ControllerException } from "./ControllerException.ts";
import { App, Directory, File, print } from "./deps.ts";

type ConfigType = {
  directories: {
    controllers: string;
  };
};

const __dirname = new URL(".", import.meta.url).pathname;

export const loadControllers = async (): Promise<Record<string, unknown>> => {
  const config = App.getConfig<ConfigType>();
  const controllerDir = config.directories.controllers;
  const rootDir = App.getRootDir();
  const directory = new Directory(controllerDir);
  let controllers = directory.files(/Controller\.ts$/, true);

  controllers = [
    new File(`${__dirname}NotFoundController.ts`, "default"),
    new File(`${__dirname}ServerErrorController.ts`, "default"),
    ...controllers,
  ];

  const result: Record<string, unknown> = {};

  for (const controller of controllers) {
    const path = controller.getPath();
    const name = controller.getName();
    const fullName = path.replace(new RegExp(`^${controllerDir}/`), "").replace(
      new RegExp(`\.${controller.getExt()}$`),
      "",
    );

    try {
      const c = await import(
        `${(controller.tag === "default") ? "" : rootDir + "/"}${path}`
      );

      if (!c[name]) {
        throw new ControllerException(
          `Cannot load ${fullName}`,
          null,
          {
            file: path,
            try: `export class ${name} {...}`,
          },
        );
      }

      result[fullName] = new c[name]();
    } catch (e) {
      print(e);
      Deno.exit(1);
    }
  }

  return result;
};
