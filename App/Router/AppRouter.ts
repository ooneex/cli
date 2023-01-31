import { appConfig } from "../Config/AppConfig.ts";
import { Directory, File, Path, Route, Router, RouteType } from "../deps.ts";
import { ManifestType } from "./types.ts";

const manifest: ManifestType = {
  routes: {},
  islands: {},
  baseUrl: `file://${Path.resolve(Deno.cwd())}/fresh.gen.ts`,
  config: {},
};

export class AppRouter {
  private routes: Record<string, Route> = {};

  private async parseIslands(): Promise<Record<string, unknown>> {
    const islandsDir = appConfig.getDirectories()?.islands;
    if (!islandsDir) {
      // TODO: Set error message and catch it in the front
      console.log(
        "Islands not found in configuration file. Check config/app.config.ts file",
      );
      Deno.exit(1);
    }

    const directory = new Directory(islandsDir);
    if (!directory.exists()) {
      // TODO: Set error message and catch it in the front
      console.log(`Directory ${islandsDir} not found.`);
      Deno.exit(1);
    }

    let islandFiles = directory.files(/\.tsx$/i);

    const directories = directory.directories(null, true);
    directories.map((dir) => {
      islandFiles = [...islandFiles, ...dir.files(/\.tsx$/i)];
    });

    let importContent = "";
    let arrayContent = `const islands = {\n`;

    islandFiles.map((islandFile, index) => {
      importContent +=
        `import \$${index} from "@app/${islandFile.getPath()}";\n`;
      arrayContent += `  "./${islandFile.getPath()}": \$${index},\n`;
    });

    const content =
      `${importContent}\n${arrayContent}};\n\nexport default islands;\n`;

    const file = new File("var/cache/islands.ts");

    file.ensure();
    file.write(content);

    const islands: Record<string, unknown> =
      (await import(`@app/var/cache/islands.ts`)).default;

    return islands;
  }

  public async parse(): Promise<ManifestType> {
    const routesDir = appConfig.getDirectories()?.routes;
    if (!routesDir) {
      // TODO: Set error message and catch it in the front
      console.log(
        "Routes not found in configuration file. Check config/app.config.ts file",
      );
      Deno.exit(1);
    }

    const directory = new Directory(routesDir);
    if (!directory.exists()) {
      // TODO: Set error message and catch it in the front
      console.log(`Directory ${routesDir} not found.`);
      Deno.exit(1);
    }

    let routesDef = directory.files(/\.ts$/i);

    const directories = directory.directories(null, true);
    directories.map((dir) => {
      routesDef = [...routesDef, ...dir.files(/\.ts$/i)];
    });

    let importContent = "";
    let arrayContent = `const routes = [\n`;

    routesDef.map((routeDef, index) => {
      importContent += `import \$${index} from "@app/${routeDef.getPath()}";\n`;
      arrayContent += `  \$${index},\n`;
    });

    const content =
      `${importContent}\n${arrayContent}];\n\nexport default routes;\n`;

    const file = new File("var/cache/routes.ts");

    file.ensure();
    file.write(content);

    const routes: RouteType[] =
      (await import(`@app/var/cache/routes.ts`)).default;

    routes.map((route) => {
      const r = new Route(route);
      this.routes[r.getName()] = r;
    });

    // Cache islands
    const islands = await this.parseIslands();
    // Get deno.json config file
    const denoConfigFile = new File("deno.json");
    // Create Manifest
    routesDef.map((routeDef, index) => {
      const route = routes[index];
      manifest.routes[`./${routeDef.getPath()}`] = {
        default: route.view,
        handler: route.handler,
        config: {
          name: route.name,
          routeOverride: route.path,
          methods: route.methods,
          csp: route.csp,
        },
      };

      if (route.middleware) {
        const middlewarePath = `./${
          Path.dirname(routeDef.getPath())
        }/_middleware.ts`;
        manifest.routes[middlewarePath] = {
          default: route.middleware,
        };
      }
    });

    // Set NotFound and Server errors
    const notFound = appConfig.getErrors()?.notFound;
    if (notFound) {
      manifest.routes[`./${routesDir}/_404.tsx`] = {
        default: notFound,
      };
    }

    const server = appConfig.getErrors()?.server;
    if (server) {
      manifest.routes[`./${routesDir}/_500.tsx`] = {
        default: server,
      };
    }

    manifest.islands = islands;
    try {
      manifest.config = JSON.parse(denoConfigFile.read());
    } catch {
      // TODO: Set error message and catch it in the front
      console.log("Error found in deno.json file");
    }

    return manifest;
  }

  public getRouter(): Router {
    const router = new Router();
    router.set(this.routes);

    return router;
  }
}

export const appRouter = new AppRouter();
