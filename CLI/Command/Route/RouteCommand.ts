import {
  ActionType,
  ArgType,
  CommandType,
  CommandVersionType,
  ICommand,
  LongFlagType,
  ShortFlagType,
} from "../../types.ts";
import { createRoute } from "./create.ts";

export class RouteCommand implements ICommand {
  public getActions(): ActionType[] {
    return [
      { name: "new", description: "Create new route" },
      { name: "create", description: "Create new route" },
    ];
  }

  public getArgs(): ArgType[] {
    return [];
  }

  public getDescription(): string {
    return "Manage route for Ooneex application";
  }

  public getLongFlags(): LongFlagType[] {
    return [];
  }

  public getName(): string {
    return "route";
  }

  public getShortFlags(): ShortFlagType[] {
    return [];
  }

  public getUsage(): string[] {
    return [
      "ooneex route:new",
      "ooneex route:create",
    ];
  }

  public getVersion(): CommandVersionType {
    return "1.0.0";
  }

  public async run(app: CommandType): Promise<Record<string, unknown>> {
    switch (app.action) {
      case "new":
      case "create":
        return await createRoute(app);
    }

    return {};
  }
}
