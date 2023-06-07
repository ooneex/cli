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
import { IslandHelper } from "./IslandHelper.ts";

export const createIsland = async (): Promise<void> => {
  const components = IslandHelper.getDirectories();

  // Select directory
  const prompt = new SelectPrompt("Choose the directory for the island");
  components.forEach((dir) => {
    prompt.addOption({ name: dir, value: dir });
  });
  prompt.searchLabel("Search");
  const dir = await prompt.prompt();

  // Ask component name

  const inputPrompt = new InputPrompt("Island name (e.g. ShowMessage)");

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

  const result = IslandHelper.create(dir as string, name);

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
  }
};
