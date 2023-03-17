import {
  ActionType,
  ArgType,
  CommandType,
  CommandVersionType,
  ICommand,
  LongFlagType,
  ShortFlagType,
} from "../../types.ts";

import { create as createComponent } from "../Component/create.ts";
import { create as createHandler } from "../Handler/create.ts";
import { create as createIsland } from "../Island/create.ts";
import { create as createMiddleware } from "../Middleware/create.ts";
import { create as createProject } from "../Project/create.ts";
import { create as createRoute } from "../Route/create.ts";
import { create as createView } from "../View/create.ts";

export class MakeCommand implements ICommand {
  public getActions(): ActionType[] {
    return [
      { name: "component", description: "Create new component" },
      { name: "handler", description: "Create new handler" },
      { name: "island", description: "Create new island" },
      { name: "middleware", description: "Create new middleware" },
      { name: "project", description: "Create new project" },
      { name: "route", description: "Create new route" },
      { name: "view", description: "Create new view" },
    ];
  }

  public getArgs(): ArgType[] {
    return [];
  }

  public getDescription(): string {
    return "Create resources for Ooneex application";
  }

  public getLongFlags(): LongFlagType[] {
    return [];
  }

  public getName(): string {
    return "make";
  }

  public getShortFlags(): ShortFlagType[] {
    return [];
  }

  public getUsage(): string[] {
    return [
      "ooneex make:component",
      "ooneex make:handler",
      "ooneex make:island",
      "ooneex make:middleware",
      "ooneex make:project",
      "ooneex make:route",
      "ooneex make:view",
    ];
  }

  public getVersion(): CommandVersionType {
    return "1.0.0";
  }

  public async run(app: CommandType): Promise<Record<string, unknown>> {
    switch (app.action) {
      case "component":
        return await createComponent(app);
      case "handler":
        return await createHandler(app);
      case "island":
        return await createIsland(app);
      case "middleware":
        return await createMiddleware(app);
      case "project":
        return await createProject(app);
      case "route":
        return await createRoute(app);
      case "view":
        return await createView(app);
    }

    return {};
  }
}
