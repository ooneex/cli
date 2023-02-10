import { appConfig } from "../Config/AppConfig.ts";
import { ConfigException } from "../Config/ConfigException.ts";
import {
  Directory,
  File,
  Path,
  Route,
  RouteDefinitionType,
  Router,
} from "../deps.ts";
import { DirectoryNotFoundException } from "../Directory/DirectoryNotFoundException.ts";
import { ProxyHandler } from "../Proxy/ProxyHandler.ts";
import { ProxyMiddleware } from "../Proxy/ProxyMiddleware.ts";
import { ProxyView } from "../Proxy/ProxyView.tsx";
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
      throw new DirectoryNotFoundException(
        "Islands not found in the configuration file. Check config/app.config.ts file",
      );
    }

    const directory = new Directory(islandsDir);
    if (!directory.exists()) {
      throw new DirectoryNotFoundException(
        `Directory ${islandsDir} not found.`,
      );
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
      arrayContent += `  "./${islandFile.getPath()}": {default: \$${index}},\n`;
    });

    const content =
      `${importContent}\n${arrayContent}};\n\nexport default islands;\n`;

    const file = new File("var/cache/islands.ts");

    file.ensure();
    file.write(content);

    return (await import(`@app/var/cache/islands.ts`)).default;
  }

  public async parse(): Promise<ManifestType> {
    const routesDir = appConfig.getDirectories()?.routes;
    if (!routesDir) {
      throw new DirectoryNotFoundException(
        "Routes not found in the configuration file. Check config/app.config.ts file",
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

    const routes: RouteDefinitionType[] =
      (await import(`@app/var/cache/routes.ts`)).default;

    routes.map((route) => {
      const r = new Route(route);
      this.routes[r.getName()] = r;
    });

    // Cache islands
    const islands = await this.parseIslands();

    // Create Manifest
    routesDef.map((routeDef, index) => {
      const route = routes[index];
      /*manifest.routes[`./${routeDef.getPath()}`] = {
        default: route.view,
        handler: ProxyHandler,
        config: {
          name: route.name,
          routeOverride: route.path,
          csp: route.csp,
        },
      };*/

      if (route.middleware) {
        const middlewarePath = `./${
          Path.dirname(routeDef.getPath())
        }/_middleware.ts`;
        manifest.routes[middlewarePath] = {
          handler: route.middleware,
        };
      }
    });

    // Set proxy handler
    manifest.routes[`./${routesDir}/index.ts`] = {
      default: ProxyView,
      handler: ProxyHandler,
      config: {
        name: "proxy",
        routeOverride: "/*",
        csp: true,
      },
    };

    // Set proxy middleware
    if (manifest.routes[`./${routesDir}/_middleware.ts`]) {
      manifest.routes[`./${routesDir}/_middleware.ts`] = {
        handler: [
          ProxyMiddleware,
          manifest.routes[`./${routesDir}/_middleware.ts`],
        ],
      };
    } else {
      manifest.routes[`./${routesDir}/_middleware.ts`] = {
        handler: ProxyMiddleware,
      };
    }

    // Set NotFound errors
    manifest.routes[`./${routesDir}/_404.tsx`] = {
      default: appConfig.getErrors()?.notFound.view,
      handler: appConfig.getErrors()?.notFound.handler,
    };

    // Set server errors
    const server = appConfig.getErrors()?.server;
    if (server) {
      manifest.routes[`./${routesDir}/_500.tsx`] = {
        default: appConfig.getErrors()?.server.view,
        handler: appConfig.getErrors()?.server.handler,
      };
    }

    manifest.islands = islands;
    try {
      // Get deno.json config file
      const denoConfigFile = new File("deno.json");
      manifest.config = JSON.parse(denoConfigFile.read());
    } catch (e) {
      throw new ConfigException(e.message);
    }

    return manifest;
  }

  public getRouter(): Router {
    const router = new Router();
    router.collection.set(this.routes);

    return router;
  }
}

export const appRouter = new AppRouter();
