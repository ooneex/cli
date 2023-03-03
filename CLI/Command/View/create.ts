import { File, Helper } from "../../deps.ts";
import { ConfirmPrompt, InputPrompt, SelectPrompt } from "../../Prompt/mod.ts";
import { CommandType } from "../../types.ts";
import { ViewHelper } from "./Helper.ts";

export const createView = async (
  app: CommandType,
): Promise<Record<string, unknown>> => {
  const views = await ViewHelper.getDirectories();

  // Select directory
  const prompt = new SelectPrompt("Choose the directory");
  views.map((dir) => {
    prompt.addOption({ name: dir, value: dir });
  });
  prompt.searchLabel("Search");
  const fileDir = await prompt.prompt();

  const inputPrompt = new InputPrompt("File name (e.g. WelcomeView)");

  inputPrompt.transform((input): string => {
    return Helper.pascalize(input);
  });

  inputPrompt.validate((input): boolean | string => {
    if (!/View$/.test(input)) {
      return `Value must end with "View"`;
    }

    input = Helper.pascalize(input);

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
  const filenameFormatted = filename.split("/");
  const content = (new File(`${__dirname}view.template.txt`)).read().replaceAll(
    "{{ name }}",
    filenameFormatted[filenameFormatted.length - 1],
  );

  ViewHelper.create(`${fileDir}/${filename}`, content);

  app.output.newLine();
  app.output.success(`File "${filePath}" created`);
  app.output.newLine();

  return {};
};
