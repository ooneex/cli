import { Directory, File } from "../../deps.ts";
import { ConfirmPrompt, InputPrompt, SelectPrompt } from "../../Prompt/mod.ts";
import { CommandType } from "../../types.ts";
import {MiddlewareCreationException} from "./MiddlewareCreationException.ts";

export const createMiddleware = async (
  app: CommandType,
): Promise<Record<string, unknown>> => {
  let config = {};
  let middlewaresDir = "";

  try {
    config = (await import(`${Deno.cwd()}/config/app.config.ts`)).default;
    // @ts-ignore: trust me
    middlewaresDir = config.directories.middlewares;
  } catch (e) {
    throw new MiddlewareCreationException(e.message);
  }

  const directory = new Directory(`${middlewaresDir}`);
  const directories = directory.directories(null, true);

  // Select directory
  const prompt = new SelectPrompt("Choose the directory");
  prompt.addOption({ name: middlewaresDir, value: middlewaresDir });

  directories.map((dir) => {
    prompt.addOption({ name: dir.getPath(), value: dir.getPath() });
  });

  prompt
    .defaultValue(middlewaresDir)
    .searchLabel("Search")
    .isSearch(true);

  const fileDir = await prompt.prompt();

  const inputPrompt = new InputPrompt("File name (e.g. WelcomeMiddleware)");
  inputPrompt.validate((input): boolean | string => {
    if (!/^[A-Z][a-zA-Z0-9]*Middleware$/.test(input)) {
      return `Value must matched with "/^[A-Z][a-zA-Z0-9]*Middleware$/"`;
    }

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
  const content = (new File(`${__dirname}middleware.template.txt`)).read().replaceAll(
    "{{ name }}",
    filename,
  );
  const file = new File(`${Deno.cwd()}/${fileDir}/${filename}.ts`);
  file.ensure();
  file.write(content);

  app.output.newLine();
  app.output.success(`File "${filePath}" created`);
  app.output.newLine();

  return {};
};
