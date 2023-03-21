import { File, Helper } from "../../deps.ts";
import { ConfirmPrompt, InputPrompt, SelectPrompt } from "../../Prompt/mod.ts";
import { CommandType } from "../../types.ts";
import { ComponentHelper } from "./Helper.ts";

const __dirname = new URL(".", import.meta.url).pathname;

// TODO: generate unit test file

export const create = async (
  app: CommandType,
): Promise<Record<string, unknown>> => {
  const components = ComponentHelper.getDirectories();

  // Select directory
  const prompt = new SelectPrompt("Choose the directory");
  components.map((dir) => {
    prompt.addOption({ name: dir, value: dir });
  });
  prompt.searchLabel("Search");
  const fileDir = await prompt.prompt();

  const inputPrompt = new InputPrompt("Component name (e.g. ButtonPrimary)");

  inputPrompt.transform((input): string => {
    return Helper.pascalize(input);
  });

  inputPrompt.validate((input): boolean | string => {
    input = Helper.pascalize(input);

    const filePath = `${fileDir}/${input}.tsx`;
    if ((new File(`${Deno.cwd()}/${filePath}`)).exists()) {
      return `File "${filePath}" already exists`;
    }

    return true;
  });
  const filename = await inputPrompt.prompt();
  const filePath = `${fileDir}/${filename}/${filename}.tsx`;

  const confirmPrompt = new ConfirmPrompt(`Create "${filePath}" file`);
  confirmPrompt.defaultValue(false);
  const confirm = await confirmPrompt.prompt();

  if (!confirm) {
    return {};
  }

  app.output.newLine();

  const content = (new File(`${__dirname}component.template.txt`)).read()
    .replaceAll("{{ name }}", filename);

  ComponentHelper.create(fileDir as string, filename, content);

  app.output.newLine();
  app.output.success(`File "${filePath}" created`);
  app.output.newLine();
  app.output.success(`File "${fileDir}/${filename}/mod.ts" created`);
  app.output.newLine();
  app.output.success(`File "${fileDir}/${filename}/types.ts" created`);
  app.output.newLine();

  return {};
};
