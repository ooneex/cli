import {Directory, File, Helper} from "../../deps.ts";
import { ConfirmPrompt, InputPrompt, SelectPrompt } from "../../Prompt/mod.ts";
import { CommandType } from "../../types.ts";
import {HandlerHelper} from "./Helper.ts";

export const createHandler = async (
  app: CommandType,
): Promise<Record<string, unknown>> => {
  const handlersDir = await HandlerHelper.getHandlersDirectory();

  const directory = new Directory(`${handlersDir}`);
  const directories = directory.directories(null, true);

  // Select directory
  const prompt = new SelectPrompt("Choose the directory");
  prompt.addOption({ name: handlersDir, value: handlersDir });

  directories.map((dir) => {
    prompt.addOption({ name: dir.getPath(), value: dir.getPath() });
  });

  prompt
    .defaultValue(handlersDir)
    .searchLabel("Search")
    .isSearch(true);

  const fileDir = await prompt.prompt();

  const inputPrompt = new InputPrompt("File name (e.g. WelcomeHandler)");

  inputPrompt.transform((input): string => {
    return Helper.pascalize(input);
  });

  inputPrompt.validate((input): boolean | string => {
    if (!/Handler$/.test(input)) {
      return `Value must end with "Handler"`;
    }

    input = Helper.pascalize(input);

    const filePath = `${fileDir}/${input}.ts`;
    if ((new File(`${Deno.cwd()}/${filePath}`)).exists()) {
      return `File "${filePath}" already exists`;
    }

    return true;
  });
  const filename = await inputPrompt.prompt();
  const filePath = `${fileDir}/${filename}.ts`;

  const confirmPrompt = new ConfirmPrompt(`Create "${filePath}" file`);
  confirmPrompt.defaultValue(false);
  const confirm = await confirmPrompt.prompt();

  if (!confirm) {
    return {};
  }

  const __dirname = new URL(".", import.meta.url).pathname;
  const content = (new File(`${__dirname}handler.template.txt`)).read().replaceAll(
    "{{ name }}",
    filename,
  );

  HandlerHelper.createHandler(`${fileDir}/${filename}`, content);

  app.output.newLine();
  app.output.success(`File "${filePath}" created`);
  app.output.newLine();

  return {};
};
