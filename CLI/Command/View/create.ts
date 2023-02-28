import { Directory, File } from "../../deps.ts";
import { ConfirmPrompt, InputPrompt, SelectPrompt } from "../../Prompt/mod.ts";
import { CommandType } from "../../types.ts";
import {HandlerHelper} from "../Handler/Helper.ts";
import {ViewHelper} from "./Helper.ts";

export const createView = async (
  app: CommandType,
): Promise<Record<string, unknown>> => {
  const viewsDir = await ViewHelper.getViewsDirectory();

  const directory = new Directory(`${viewsDir}`);
  const directories = directory.directories(null, true);

  // Select directory
  const prompt = new SelectPrompt("Choose the directory");
  prompt.addOption({ name: viewsDir, value: viewsDir });

  directories.map((dir) => {
    prompt.addOption({ name: dir.getPath(), value: dir.getPath() });
  });

  prompt
    .defaultValue(viewsDir)
    .searchLabel("Search")
    .isSearch(true);

  const fileDir = await prompt.prompt();

  const inputPrompt = new InputPrompt("File name (e.g. WelcomeView)");
  inputPrompt.validate((input): boolean | string => {
    if (!/^[A-Z][a-zA-Z0-9]*View$/.test(input)) {
      return `Value must matched with "/^[A-Z][a-zA-Z0-9]*View$/"`;
    }

    const filePath = `${fileDir}/${input}.tsx`;
    if ((new File(`${Deno.cwd()}/${filePath}`)).exists()) {
      return `File "${filePath}" already exists`;
    }

    return true;
  });
  const filename = await inputPrompt.prompt();

  const filePath = `${fileDir}/${filename}.tsx`;

  const confirmPrompt = new ConfirmPrompt(`Create "${filePath}" file`);
  confirmPrompt.defaultValue(false);
  const confirm = await confirmPrompt.prompt();

  if (!confirm) {
    return {};
  }

  const __dirname = new URL(".", import.meta.url).pathname;
  const content = (new File(`${__dirname}view.template.txt`)).read().replaceAll(
    "{{ name }}",
    filename,
  );

  HandlerHelper.createHandler(`${fileDir}/${filename}`, content);

  app.output.newLine();
  app.output.success(`File "${filePath}" created`);
  app.output.newLine();

  return {};
};
