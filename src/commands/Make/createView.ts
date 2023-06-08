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
import { ViewHelper } from "./ViewHelper.ts";

export const createView = async (): Promise<void> => {
  const views = ViewHelper.getDirectories();

  // Select directory
  const prompt = new SelectPrompt("Choose the directory for the view");
  views.forEach((dir) => {
    prompt.addOption({ name: dir, value: dir });
  });
  prompt.searchLabel("Search");
  const dir = await prompt.prompt() as string;

  // Ask component name

  const inputPrompt = new InputPrompt("View name (e.g. Homepage)");

  inputPrompt.transform((input): string => {
    return Helper.pascalize(input);
  });

  inputPrompt.validate((input): boolean | string => {
    input = Helper.pascalize(input);

    const filePath = `${dir}/${input}/${input}View.tsx`;
    if ((new File(`${filePath}`)).exists()) {
      return `File "${filePath}" already exists`;
    }

    return true;
  });
  const name = await inputPrompt.prompt();

  const confirmPrompt = new ConfirmPrompt(
    `Create "${dir}/${name}/${name}View.tsx" file`,
  );
  confirmPrompt.defaultValue(false);
  const confirm = await confirmPrompt.prompt();

  if (!confirm) {
    return;
  }

  const result = ViewHelper.create(dir, name);

  if (result) {
    const output = new Output();
    const style = new Style();
    output.newLine();
    style.color("green");
    let message = style.render(Figure.tick());
    message += ` ${dir}/${name}/${name}View.tsx`;
    output.write(message);

    message = style.render(Figure.tick());
    message += ` ${dir}/${name}/types.ts`;
    output.write(message);

    message = style.render(Figure.tick());
    message += ` ${dir}/${name}/mod.ts`;
    output.write(message);
  }
};
