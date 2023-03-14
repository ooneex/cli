import { File, Helper } from "../../deps.ts";
import { ConfirmPrompt, InputPrompt, SelectPrompt } from "../../Prompt/mod.ts";
import { CommandType } from "../../types.ts";
import { IslandHelper } from "./Helper.ts";

export const createIsland = async (
  app: CommandType,
): Promise<Record<string, unknown>> => {
  const islands = await IslandHelper.getDirectories();

  // Select directory
  const prompt = new SelectPrompt("Choose the directory");
  islands.map((dir) => {
    prompt.addOption({ name: dir, value: dir });
  });
  prompt.searchLabel("Search");
  const fileDir = await prompt.prompt();

  const inputPrompt = new InputPrompt("Island name (e.g. ShowBooks)");

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
  const filePath = `${fileDir}/${filename}.ts`;

  const confirmPrompt = new ConfirmPrompt(`Create "${filePath}" file`);
  confirmPrompt.defaultValue(false);
  const confirm = await confirmPrompt.prompt();

  if (!confirm) {
    return {};
  }

  const __dirname = new URL(".", import.meta.url).pathname;
  const content = (new File(`${__dirname}island.template.txt`)).read()
    .replaceAll("{{ name }}", filename)
    .replaceAll("{{ id }}", crypto.randomUUID());

  IslandHelper.create(`${fileDir}/${filename}`, content);

  app.output.newLine();
  app.output.success(`File "${filePath}" created`);
  app.output.newLine();

  return {};
};
