import { File, Helper } from "../../deps.ts";
import { ConfirmPrompt, InputPrompt, SelectPrompt } from "../../Prompt/mod.ts";
import { CommandType } from "../../types.ts";
import { HandlerHelper } from "./Helper.ts";

const __dirname = new URL(".", import.meta.url).pathname;

export const create = async (
  app: CommandType,
): Promise<Record<string, unknown>> => {
  const handlers = HandlerHelper.getDirectories();

  // Select directory
  const prompt = new SelectPrompt("Choose the directory");
  handlers.map((dir) => {
    prompt.addOption({ name: dir, value: dir });
  });
  prompt.searchLabel("Search");
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

  app.output.newLine();

  const filenameFormatted = filename.split("/");
  const content = (new File(`${__dirname}handler.template.txt`)).read()
    .replaceAll(
      "{{ name }}",
      filenameFormatted[filenameFormatted.length - 1],
    );

  HandlerHelper.create(`${fileDir}/${filename}`, content);

  app.output.newLine();
  app.output.success(`File "${filePath}" created`);
  app.output.newLine();

  return {};
};
