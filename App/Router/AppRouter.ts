import { config } from "../Config/Config.ts";
import {
  Directory,
  File,
  IRouter,
  Route,
  RouteDefinitionType,
  Router,
} from "../deps.ts";
import { DirectoryNotFoundException } from "../Directory/DirectoryNotFoundException.ts";

export class AppRouter {
  private routes: Record<string, Route> = {};

  public async parse(): Promise<IRouter> {
    const routesDir = config.getDirectories()?.routes;
    if (!routesDir) {
      throw new DirectoryNotFoundException(
        'Routes not found in the configuration file. Check "config/app.config.ts" file',
      );
    }

    const directory = new Directory(routesDir);
    if (!directory.exists()) {
      throw new DirectoryNotFoundException(`Directory ${routesDir} not found`);
    }

    let routesDef = directory.files(/\.ts$/i);

    const directories = directory.directories(null, true);
    directories.map((dir) => {
      routesDef = [...routesDef, ...dir.files(/\.ts$/i)];
    });

    let importContent =
      `import {RouteDefinitionType} from "@ooneex/routing";\n`;
    let arrayContent = `const routes: RouteDefinitionType[] = [\n`;

    routesDef.map((routeDef, index) => {
      importContent += `import \$${index} from "@app/${routeDef.getPath()}";\n`;
      arrayContent += `  \$${index},\n`;
    });

    const content =
      `${importContent}\n${arrayContent}];\n\nexport default routes;\n`;

    const file = new File("var/cache/routes.ts");

    file.ensure();
    file.write(content);

    const routes: RouteDefinitionType[] =
      (await import(`@app/var/cache/routes.ts`)).default;

    routes.map((route) => {
      const r = new Route(route);
      this.routes[r.getName()] = r;
    });

    const router = new Router();
    router.collection.set(this.routes);

    return router;
  }
}

export const appRouter = new AppRouter();
