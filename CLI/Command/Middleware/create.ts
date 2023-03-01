import { File, Helper } from "../../deps.ts";
import { ConfirmPrompt, InputPrompt, SelectPrompt } from "../../Prompt/mod.ts";
import { CommandType } from "../../types.ts";
import { MiddlewareHelper } from "./Helper.ts";

export const createMiddleware = async (
  app: CommandType,
): Promise<Record<string, unknown>> => {
  const middlewares = await MiddlewareHelper.getDirectories();

  // Select directory
  const prompt = new SelectPrompt("Choose the directory");
  middlewares.map((dir) => {
    prompt.addOption({ name: dir, value: dir });
  });
  prompt.searchLabel("Search");
  const fileDir = await prompt.prompt();

  const inputPrompt = new InputPrompt("File name (e.g. WelcomeMiddleware)");

  inputPrompt.transform((input): string => {
    return Helper.pascalize(input);
  });

  inputPrompt.validate((input): boolean | string => {
    if (!/Middleware$/.test(input)) {
      return `Value must end with "Middleware"`;
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
  const filenameFormatted = filename.split("/");
  const content = (new File(`${__dirname}middleware.template.txt`)).read()
    .replaceAll(
      "{{ name }}",
      filenameFormatted[filenameFormatted.length - 1],
    );

  MiddlewareHelper.createMiddleware(`${fileDir}/${filename}`, content);

  app.output.newLine();
  app.output.success(`File "${filePath}" created`);
  app.output.newLine();

  return {};
};
