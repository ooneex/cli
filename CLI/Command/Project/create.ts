import {
  AppApiDirectories,
  AppFullDirectories,
  Directory,
  File,
  Helper,
} from "../../deps.ts";
import { ConfirmPrompt, InputPrompt, NumberPrompt } from "../../Prompt/mod.ts";
import { CommandType } from "../../types.ts";

const __dirname = new URL(".", import.meta.url).pathname;

export const create = async (
  app: CommandType,
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

  app.output.newLine();

  // Create directories
  const project = new Directory(projectName);
  project.ensure();

  let directories: string[];

  if (isApi) {
    directories = Object.values(AppApiDirectories);
  } else {
    directories = Object.values(AppFullDirectories);
  }

  directories.map((d: string) => {
    project.mkdir(d);
    project.touch(`${d}/.gitkeep`, "");
    app.output.success(`Directory "${d}" created`);
    app.output.newLine();
  });

  // Config
  project.rm([`config/.gitkeep`]);
  let content = (new File(`${__dirname}templates/app.config.template.txt`))
    .read()
    .replaceAll(
      "{{ directories }}",
      isApi ? "AppApiDirectories" : "AppFullDirectories",
    );
  project.touch(`config/app.config.ts`, content);
  app.output.success(`File "config/app.config.ts" created`);
  app.output.newLine();

  // Handler
  project.rm([`${AppApiDirectories.handlers}/.gitkeep`]);
  content = (new File(`${__dirname}../Handler/handler.template.txt`)).read()
    .replaceAll("{{ name }}", "HomepageHandler");
  project.touch(`${AppApiDirectories.handlers}/HomepageHandler.ts`, content);
  app.output.success(`File "${AppApiDirectories.handlers}/HomepageHandler.ts" created`);
  app.output.newLine();

  // Middleware
  project.rm([`${AppApiDirectories.middlewares}/.gitkeep`]);
  content = (new File(`${__dirname}../Middleware/middleware.template.txt`))
    .read()
    .replaceAll("{{ name }}", "HomepageMiddleware");
  project.touch(
    `${AppApiDirectories.middlewares}/HomepageMiddleware.ts`,
    content,
  );
  app.output.success(`File "${AppApiDirectories.middlewares}/HomepageMiddleware.ts" created`);
  app.output.newLine();

  // Route
  project.rm([`${AppApiDirectories.routes}/.gitkeep`]);
  content = (new File(`${__dirname}templates/route.template.txt`)).read();
  project.touch(`${AppApiDirectories.routes}/HomepageRoute.ts`, content);
  app.output.success(`File "${AppApiDirectories.routes}/HomepageRoute.ts" created`);
  app.output.newLine();

  // var
  project.rm([`${AppApiDirectories.var}/.gitkeep`]);
  project.mkdir(`${AppApiDirectories.var}/cache`);
  project.mkdir(`${AppApiDirectories.var}/logs`);

  // View
  if (!isApi) {
    project.rm([`${AppFullDirectories.views}/.gitkeep`]);
    project.mkdir(`${AppFullDirectories.views}/Exception`);
    content = (new File(`${__dirname}../View/view.template.txt`)).read()
      .replaceAll("{{ name }}", "HomepageView");
    project.touch(`${AppFullDirectories.views}/HomepageView.tsx`, content);
    app.output.success(`File "${AppFullDirectories.views}/HomepageView.tsx" created`);
    app.output.newLine();

    content = (new File(`${__dirname}templates/view.not.found.template.txt`))
      .read();
    project.touch(
      `${AppFullDirectories.views}/Exception/NotFoundView.tsx`,
      content,
    );
    app.output.success(`File "${AppFullDirectories.views}/Exception/NotFoundView.tsx" created`);
    app.output.newLine();

    content = (new File(`${__dirname}templates/view.server.error.template.txt`))
      .read();
    project.touch(
      `${AppFullDirectories.views}/Exception/ServerErrorView.tsx`,
      content,
    );
    app.output.success(`File "${AppFullDirectories.views}/Exception/ServerErrorView.tsx" created`);
    app.output.newLine();
  }

  // .env
  content = (new File(`${__dirname}templates/env.template.txt`)).read()
    .replaceAll("{{ api }}", `${isApi}`)
    .replaceAll("{{ secret }}", `${crypto.randomUUID()}`)
    .replaceAll("{{ port }}", `${projectPort}`);
  project.touch(`.env`, content);
  app.output.success(`File ".env" created`);
  app.output.newLine();
  project.touch(`.env.local`, content);
  app.output.success(`File ".env.local" created`);
  app.output.newLine();

  // .ignore
  content = (new File(`${__dirname}templates/ignore.template.txt`)).read();
  project.touch(`.gitignore`, content);
  app.output.success(`File ".gitignore" created`);
  app.output.newLine();

  // deno.json
  content = (new File(`${__dirname}templates/deno.full.template.txt`)).read();
  if (isApi) {
    content = (new File(`${__dirname}templates/deno.api.template.txt`)).read();
  }

  project.touch(`deno.json`, content);
  app.output.success(`File "deno.json" created`);
  app.output.newLine();

  // index.ts
  content = (new File(`${__dirname}templates/index.template.txt`)).read();
  project.touch(`index.ts`, content);
  app.output.success(`File "index.ts" created`);
  app.output.newLine();

  // README.md
  content = (new File(`${__dirname}templates/readme.template.txt`)).read();
  project.touch(`README.md`, content);
  app.output.success(`File "README.md" created`);
  app.output.newLine(2);

  app.output.info(`cd ${projectName}`, false);
  app.output.newLine();
  app.output.info(`${app.figure.arrowRight()} deno task start`, false);
  app.output.newLine();

  return {};
};
