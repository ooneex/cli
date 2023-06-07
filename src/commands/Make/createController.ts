import {
  ConfirmPrompt,
  Figure,
  File,
  Helper,
  InputPrompt,
  Output,
  SelectPrompt,
  Style,
} from "../../deps.ts";
import { ControllerHelper } from "./ControllerHelper.ts";

export const createController = async (): Promise<void> => {
  const controllers = ControllerHelper.getDirectories();

  // Select directory
  const prompt = new SelectPrompt("Choose the directory for the controller");
  controllers.forEach((dir) => {
    prompt.addOption({ name: dir, value: dir });
  });
  prompt.searchLabel("Search");
  const dir = await prompt.prompt();

  // Ask component name

  const inputPrompt = new InputPrompt("Controller name (e.g. Homepage)");

  inputPrompt.transform((input): string => {
    return Helper.pascalize(input);
  });

  inputPrompt.validate((input): boolean | string => {
    input = Helper.pascalize(input);

    const filePath = `${dir}/${input}/${input}Controller.ts`;
    if ((new File(`${filePath}`)).exists()) {
      return `File "${filePath}" already exists`;
    }

    return true;
  });
  const name = await inputPrompt.prompt();

  const confirmPrompt = new ConfirmPrompt(
    `Create "${dir}/${name}/${name}Controller.ts" file`,
  );
  confirmPrompt.defaultValue(false);
  const confirm = await confirmPrompt.prompt();

  if (!confirm) {
    return;
  }

  // Ask route name
  const routeNamePrompt = new InputPrompt("Route name (e.g. homepage)");
  routeNamePrompt.defaultValue(Helper.snakize(name));
  const routeName = await routeNamePrompt.prompt();

  // Ask route path
  const routePathPrompt = new InputPrompt("Route path (e.g. /homepage)");
  routePathPrompt.defaultValue(`/${Helper.kebabize(name)}`);
  const routePath = await routePathPrompt.prompt();

  // Ask route methods
  const routeMethodsPrompt = new SelectPrompt("Choose http methods");
  routeMethodsPrompt.isMultiple(true).min(1)
    .addOption({ name: "GET", value: "GET" })
    .addOption({ name: "POST", value: "POST" })
    .addOption({ name: "PUT", value: "PUT" })
    .addOption({ name: "PATCH", value: "PATCH" })
    .addOption({ name: "DELETE", value: "DELETE" })
    .addOption({ name: "OPTIONS", value: "OPTIONS" })
    .addOption({ name: "HEAD", value: "HEAD" })
    .addOption({ name: "TRACE", value: "TRACE" })
    .addOption({ name: "CONNECT", value: "CONNECT" });
  const routeMethods = await routeMethodsPrompt.prompt();

  const result = ControllerHelper.create(
    dir as string,
    name,
    routeName,
    routePath,
    routeMethods as string[],
  );

  if (result) {
    const output = new Output();
    const style = new Style();
    output.newLine();
    style.color("green");
    let message = style.render(Figure.tick());
    message += ` ${dir}/${name}/${name}Controller.ts`;
    output.write(message);

    message = style.render(Figure.tick());
    message += ` ${dir}/${name}/types.ts`;
    output.write(message);

    message = style.render(Figure.tick());
    message += ` ${dir}/${name}/mod.ts`;
    output.write(message);
  }
};
