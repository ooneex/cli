import { AppFullDirectories, File, Helper } from "../../deps.ts";
import { InputPrompt, SelectPrompt } from "../../Prompt/mod.ts";
import { CommandType } from "../../types.ts";
import { HandlerHelper } from "../Handler/Helper.ts";
import { ViewHelper } from "../View/Helper.ts";
import { RouteHelper } from "./Helper.ts";

export const create = async (
  app: CommandType,
): Promise<Record<string, unknown>> => {
  const routes = RouteHelper.getDirectories();

  // Select directory
  const prompt = new SelectPrompt("Choose the directory");
  routes.map((dir) => {
    prompt.addOption({ name: dir, value: dir });
  });
  prompt.searchLabel("Search");
  const fileDir = await prompt.prompt();

  // Route name
  const routeNamePrompt = new InputPrompt("Route name (e.g. BookShowRoute)");

  routeNamePrompt.transform((input): string => {
    return Helper.pascalize(input);
  });

  routeNamePrompt.validate((input): boolean | string => {
    if (!/Route$/.test(input)) {
      return `Value must end with "Route"`;
    }

    input = Helper.pascalize(input);

    const filePath = `${fileDir}/${input}.ts`;
    if ((new File(`${Deno.cwd()}/${filePath}`)).exists()) {
      return `File "${filePath}" already exists`;
    }

    return true;
  });
  const routeName = await routeNamePrompt.prompt();

  // Route path
  const routePathPrompt = new InputPrompt("Route path (e.g. /books/:id)");
  routePathPrompt.validate((input): boolean | string => {
    if (!/^\//.test(input)) {
      return `Value must start with "/"`;
    }

    return true;
  });
  const routePath = await routePathPrompt.prompt();

  // Select route handler
  const handlers = await HandlerHelper.getHandlers();
  const handlerPrompt = new SelectPrompt("Select route handler");
  handlers.map((dir) => {
    handlerPrompt.addOption({ name: dir, value: dir });
  });
  handlerPrompt.searchLabel("Search");
  const routeHandler = await handlerPrompt.prompt();

  // Select route view
  let routeView: string | null = null;
  if (app.isFullApp()) {
    const views = await ViewHelper.getViews();
    const viewPrompt = new SelectPrompt("Select route view");
    views.map((dir) => {
      viewPrompt.addOption({ name: dir, value: dir });
    });
    viewPrompt.searchLabel("Search");
    routeView = (await viewPrompt.prompt()) as string;
  }

  // Route description
  const routeDescriptionPrompt = new InputPrompt("Route description");
  routeDescriptionPrompt.validate((input): boolean | string => {
    if (input.trim() === "") {
      return `Route description is required`;
    }

    return true;
  });
  const routeDescription = await routeDescriptionPrompt.prompt();

  app.output.newLine();

  let content = "";
  content += `import { RouteDefinitionType } from "@ooneex/routing";\n`;
  content += `import RouteHandler from "@app/${routeHandler}.ts";\n\n`;
  content += `const routeDefinition: RouteDefinitionType = {\n`;
  content += `  name: "${routeName}",\n`;
  content += `  path: "${routePath}",\n`;
  content += `  // methods: ["GET", "POST"],\n`;
  content += `  // ips: ["127.0.0.1"],\n`;
  content += `  // locales: ["fr", "en"],\n`;
  content += `  // envs: ["dev", "test", "prod"],\n`;
  content += `  // versions: ["1.2.3", "2.0.0"],\n`;
  content += `  // hosts: ["api.ooneex.io", "ooneex.io"],\n`;
  content += `  // protocols: ["https", "http"],\n`;
  content += `  // ports: ["80", "8000"],\n`;
  content += `  handler: RouteHandler,\n`;
  if (routeView) {
    routeView = routeView.replace(`${AppFullDirectories.views}/`, "");
    content += `  view: "${routeView}",\n`;
  }
  content += `  description: "${routeDescription}",\n`;
  content += `};\n\n`;
  content += `export default routeDefinition;\n`;

  RouteHelper.create(`${fileDir}/${routeName}`, content);

  const filePath = `${fileDir}/${routeName}.ts`;

  app.output.newLine();
  app.output.success(`File "${filePath}" created`);
  app.output.newLine();

  return {};
};
