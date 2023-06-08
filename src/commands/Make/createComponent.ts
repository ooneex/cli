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
import { ComponentHelper } from "./ComponentHelper.ts";

export const createComponent = async (): Promise<void> => {
  const components = ComponentHelper.getDirectories();

  // Select directory
  const prompt = new SelectPrompt("Choose the directory for the component");
  components.forEach((dir) => {
    prompt.addOption({ name: dir, value: dir });
  });
  prompt.searchLabel("Search");
  const dir = await prompt.prompt() as string;

  // Ask component name

  const inputPrompt = new InputPrompt("Component name (e.g. ButtonPrimary)");

  inputPrompt.transform((input): string => {
    return Helper.pascalize(input);
  });

  inputPrompt.validate((input): boolean | string => {
    input = Helper.pascalize(input);

    const filePath = `${dir}/${input}/${input}.tsx`;
    if ((new File(`${filePath}`)).exists()) {
      return `File "${filePath}" already exists`;
    }

    return true;
  });
  const name = await inputPrompt.prompt();

  const confirmPrompt = new ConfirmPrompt(
    `Create "${dir}/${name}/${name}.tsx" file`,
  );
  confirmPrompt.defaultValue(false);
  const confirm = await confirmPrompt.prompt();

  if (!confirm) {
    return;
  }

  const result = ComponentHelper.create(dir, name);

  if (result) {
    const output = new Output();
    const style = new Style();
    output.newLine();
    style.color("green");
    let message = style.render(Figure.tick());
    message += ` ${dir}/${name}/${name}.tsx`;
    output.write(message);

    message = style.render(Figure.tick());
    message += ` ${dir}/${name}/types.ts`;
    output.write(message);

    message = style.render(Figure.tick());
    message += ` ${dir}/${name}/mod.ts`;
    output.write(message);

    message = style.render(Figure.tick());
    message += ` ${dir}/${name}/${name}.test.ts`;
    output.write(message);
  }
};
