import {AppApiDirectories, AppDirectories, Directory, File, Helper} from "../../deps.ts";
import {ConfirmPrompt, InputPrompt, NumberPrompt} from "../../Prompt/mod.ts";
import {CommandType} from "../../types.ts";

const __dirname = new URL(".", import.meta.url).pathname;

// TODO: add logs

export const createProject = async (
  _app: CommandType,
): Promise<Record<string, unknown>> => {

  const namePrompt = new InputPrompt("Project name");
  namePrompt.validate((input): string | boolean => {
    const directory = new Directory(`${Deno.cwd()}/${Helper.trim(input, "/")}`);
    if (directory.exists()) {
      return `Directory "${directory.getName()}" already exists`;
    }

    return true;
  });
  const projectName = await namePrompt.prompt();

  const apiPrompt = new ConfirmPrompt(`Is the project an API?`);
  apiPrompt.defaultValue(true);
  const isApi = await apiPrompt.prompt();

  const portPrompt = new NumberPrompt(`Project port`);
  portPrompt.defaultValue("3000");
  const projectPort = await portPrompt.prompt();
  portPrompt.validate((input): string | boolean => {
    if (!/^[0-9]+$/.test(input)) {
      return `Port is not valid`;
    }

    return true;
  });

  // Create directories
  const project = new Directory(projectName);
  project.ensure();

  let directories: string[];

  if (isApi) {
    directories = Object.values(AppApiDirectories);
  } else {
    directories = Object.values(AppDirectories)
  }

  directories.map((d: string) => {
    project.mkdir(d);
    project.touch(`${d}/.gitkeep`, "");
  });

  // Config
  project.rm([`config/.gitkeep`]);
  let content = (new File(`${__dirname}templates/app.config.template.txt`)).read()
    .replaceAll("{{ directories }}", isApi ? "AppApiDirectories" : "AppDirectories");
  project.touch(`config/app.config.ts`, content);

  // Handler
  project.rm([`${AppApiDirectories.handlers}/.gitkeep`]);
  content = (new File(`${__dirname}../Handler/handler.template.txt`)).read()
    .replaceAll("{{ name }}", "HomepageHandler");
  project.touch(`${AppApiDirectories.handlers}/HomepageHandler.ts`, content);

  // Middleware
  project.rm([`${AppApiDirectories.middlewares}/.gitkeep`]);
  content = (new File(`${__dirname}../Middleware/middleware.template.txt`)).read()
    .replaceAll("{{ name }}", "HomepageMiddleware");
  project.touch(`${AppApiDirectories.middlewares}/HomepageMiddleware.ts`, content);

  // Route
  project.rm([`${AppApiDirectories.routes}/.gitkeep`]);
  content = (new File(`${__dirname}templates/route.template.txt`)).read();
  project.touch(`${AppApiDirectories.routes}/HomepageRoute.ts`, content);

  // var
  project.rm([`${AppApiDirectories.var}/.gitkeep`]);
  project.mkdir(`${AppApiDirectories.var}/cache`);
  project.mkdir(`${AppApiDirectories.var}/logs`);

  // View
  if (!isApi) {
    project.rm([`${AppDirectories.views}/.gitkeep`]);
    project.mkdir(`${AppDirectories.views}/Exception`);
    content = (new File(`${__dirname}../View/view.template.txt`)).read()
      .replaceAll("{{ name }}", "HomepageView");
    project.touch(`${AppDirectories.views}/HomepageView.tsx`, content);

    content = (new File(`${__dirname}templates/view.not.found.template.txt`)).read();
    project.touch(`${AppDirectories.views}/Exception/NotFoundView.tsx`, content);

    content = (new File(`${__dirname}templates/view.server.error.template.txt`)).read();
    project.touch(`${AppDirectories.views}/Exception/ServerErrorView.tsx`, content);
  }

  // .env
  content = (new File(`${__dirname}templates/env.template.txt`)).read()
    .replaceAll("{{ api }}", `${isApi}`)
    .replaceAll("{{ secret }}", `${crypto.randomUUID()}`)
    .replaceAll("{{ port }}", `${projectPort}`);
  project.touch(`.env`, content);
  project.touch(`.env.local`, content);

  // .ignore
  content = (new File(`${__dirname}templates/ignore.template.txt`)).read();
  project.touch(`.gitignore`, content);

  // deno.json
  content = (new File(`${__dirname}templates/deno.template.txt`)).read();
  if (isApi) {
    content = content.replace("    \"@app/components/\": \"./components/\",\n", "")
      .replace("    \"@app/islands/\": \"./islands/\",\n", "")
      .replace("    \"@app/static/\": \"./static/\",\n", "")
      .replace("    \"@app/views/\": \"./views/\",\n", "");
  }
  project.touch(`deno.json`, content);

  // index.ts
  content = (new File(`${__dirname}templates/index.template.txt`)).read();
  project.touch(`index.ts`, content);

  // README.md
  content = (new File(`${__dirname}templates/readme.template.txt`)).read();
  project.touch(`README.md`, content);

  // TODO: add end message (how to run the project, ...)

  return {};
};
